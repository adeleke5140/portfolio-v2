export const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

export const item = {
  hidden: { x: -5, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.6,
    },
  },
}

export const masterCard = {}
