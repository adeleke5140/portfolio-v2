'use client'
import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { TABS } from './data'

export function Tabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].name)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeTabElementRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current

      if (activeTabElement) {
        const { offsetLeft, offsetWidth, offsetTop, offsetHeight } =
          activeTabElement

        const clipLeft = offsetLeft
        const clipRight = offsetLeft + offsetWidth
        const clipBottom = offsetTop + offsetHeight
        const clipBottomValue = Number(
          100 - (clipBottom / container.offsetHeight) * 100
        ).toFixed()
        const clipTop = offsetTop
        const clipTopValue = Number(
          (clipTop / container.offsetHeight) * 100
        ).toFixed()
        const clipRightValue = Number(
          100 - (clipRight / container.offsetWidth) * 100
        ).toFixed()
        container.style.clipPath = `inset(${clipTopValue}% ${clipRightValue}% ${clipBottomValue}% ${Number(
          (clipLeft / container.offsetWidth) * 100
        ).toFixed()}% round 17px)`
      }
    }
  }, [activeTab, activeTabElementRef, containerRef])

  return (
    <div className="relative h-full flex flex-col justify-center items-center w-fit">
      <ul className="relative list-none flex w-full gap-2 max-w-[25rem] flex-wrap justify-start">
        {TABS.map((tab) => (
          <li key={tab.name}>
            <button
              ref={activeTab === tab.name ? activeTabElementRef : null}
              data-tab={tab.name}
              onClick={() => {
                setActiveTab(tab.name)
              }}
              className="cursor-pointer flex h-[34px] items-center gap-2 p-4 text-sm text-black focus:outline-0"
            >
              {tab.icon}
              {tab.name}
            </button>
          </li>
        ))}
      </ul>

      <div aria-hidden className="clip-path-container" ref={containerRef}>
        <ul className="relative list-none flex w-full gap-2 max-w-[40rem] flex-wrap justify-start bg-[#e87400]">
          {TABS.map((tab) => (
            <li key={tab.name}>
              <button
                data-tab={tab.name}
                onClick={() => {
                  setActiveTab(tab.name)
                }}
                className="text-white cursor-pointer flex h-[34px] items-center gap-2 p-4 text-sm focus:outline-0"
                tabIndex={-1}
              >
                {tab.icon}
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
