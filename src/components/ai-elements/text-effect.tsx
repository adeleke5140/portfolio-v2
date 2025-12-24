import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import type {
  TargetAndTransition,
  Transition,
  Variant,
  Variants,
} from 'motion/react'
import React from 'react'

export type PresetType = 'fade-in-blur'

export type PerType = 'char'

export type TextEffectProps = {
  children: string
  per?: PerType
  variants?: {
    container?: Variants
    item?: Variants
  }
  className?: string
  preset?: PresetType
  delay?: number
  speedReveal?: number
  speedSegment?: number
  onAnimationComplete?: () => void
  onAnimationStart?: () => void
  segmentWrapperClassName?: string
  containerTransition?: Transition
  segmentTransition?: Transition
  style?: React.CSSProperties
}

const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: { opacity: 0 },
}

const presetVariants: Record<
  PresetType,
  { container: Variants; item: Variants }
> = {
  'fade-in-blur': {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: 20, filter: 'blur(12px)' },
    },
  },
}

const AnimationComponent: React.FC<{
  segment: string
  variants: Variants
  per: 'line' | 'word' | 'char'
  segmentWrapperClassName?: string
}> = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content =
    per === 'line' ? (
      <motion.span variants={variants} className="block">
        {segment}
      </motion.span>
    ) : per === 'word' ? (
      <motion.span
        aria-hidden="true"
        variants={variants}
        className="inline-block whitespace-pre"
      >
        {segment}
      </motion.span>
    ) : (
      <motion.span className="inline-block whitespace-pre">
        {segment.split('').map((char, charIndex) => (
          <motion.span
            key={`char-${charIndex}`}
            aria-hidden="true"
            variants={variants}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    )

  if (!segmentWrapperClassName) {
    return content
  }

  const defaultWrapperClassName = per === 'line' ? 'block' : 'inline-block'

  return (
    <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
      {content}
    </span>
  )
})

AnimationComponent.displayName = 'AnimationComponent'

const splitText = (text: string, per: PerType) => {
  return text.split(/(\s+)/)
}

const hasTransition = (
  variant?: Variant
): variant is TargetAndTransition & { transition?: Transition } => {
  if (!variant) return false
  return typeof variant === 'object' && 'transition' in variant
}

const createVariantsWithTransition = (
  baseVariants: Variants,
  transition?: Transition & { exit?: Transition }
): Variants => {
  if (!transition) return baseVariants

  const { exit: _, ...mainTransition } = transition

  return {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(hasTransition(baseVariants.visible)
          ? baseVariants.visible.transition
          : {}),
        ...mainTransition,
      },
    },
    exit: {
      ...baseVariants.exit,
      transition: {
        ...(hasTransition(baseVariants.exit)
          ? baseVariants.exit.transition
          : {}),
        ...mainTransition,
        staggerDirection: -1,
      },
    },
  }
}

export function TextEffect({
  children,
  per = 'char',
  variants,
  className,
  preset = 'fade-in-blur',
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,

  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
}: TextEffectProps) {
  const segments = splitText(children, per)
  const MotionTag = motion['p' as keyof typeof motion] as typeof motion.div

  const baseVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants }

  const stagger = defaultStaggerTimes[per] / speedReveal

  const baseDuration = 0.3 / speedSegment

  const customStagger = hasTransition(variants?.container?.visible ?? {})
    ? (variants?.container?.visible as TargetAndTransition).transition
        ?.staggerChildren
    : undefined

  const customDelay = hasTransition(variants?.container?.visible ?? {})
    ? (variants?.container?.visible as TargetAndTransition).transition
        ?.delayChildren
    : undefined

  const computedVariants = {
    container: createVariantsWithTransition(
      variants?.container || baseVariants.container,
      {
        staggerChildren: customStagger ?? stagger,
        delayChildren: customDelay ?? delay,
        ...containerTransition,
        exit: {
          staggerChildren: customStagger ?? stagger,
          staggerDirection: -1,
        },
      }
    ),
    item: createVariantsWithTransition(variants?.item || baseVariants.item, {
      duration: baseDuration,
      ...segmentTransition,
    }),
  }

  return (
    <AnimatePresence mode="popLayout">
      <MotionTag
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={computedVariants.container}
        className={className}
        onAnimationComplete={onAnimationComplete}
        onAnimationStart={onAnimationStart}
        style={style}
      >
        {segments.map((segment, index) => (
          <AnimationComponent
            key={`${per}-${index}-${segment}`}
            segment={segment}
            variants={computedVariants.item}
            per={per}
            segmentWrapperClassName={segmentWrapperClassName}
          />
        ))}
      </MotionTag>
    </AnimatePresence>
  )
}
