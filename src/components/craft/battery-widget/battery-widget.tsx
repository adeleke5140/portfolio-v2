/*todo
read from the user battery's percentage
might need some permission stuff
*/
"use client"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { motion } from "motion/react"

export const BatteryWidget = () => {
  const [percentage, setPercentage] = useState(69)
  const [showN, setShowN] = useState(false)

  useEffect(() => {
    setInterval(() => {
      setPercentage((prev) => {
        const nextPercent = (prev + 1)
        return Math.min(nextPercent,100)
      })
    },3000)
  },[])

  useEffect(() => {
    if(percentage === 100){
      setShowN(true)
    }
  }, [percentage])


  return (
      <div className="bg-white px-6 border border-dashed w-80 py-8 flex flex-col gap-4">
        <button onClick={() => setPercentage(69)} className="absolute bg-white rounded-md size-4 grid place-items-center top-2 right-2">
          <svg width="20" height="20" className="size-3" viewBox="0 0 20 20">
            <g>
              <g className="bottom-a">
                <path d="m4,10c0,3.314,2.686,6,6,6,1.227,0,2.367-.368,3.317-1" fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></path>
                <polygon points="5.75 10 4 8 2.25 10 5.75 10" fill="#212121" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></polygon>
              </g>
              <g className="top-a">
                <polygon points="14.25 10 16 12 17.75 10 14.25 10" stroke="#525252" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" fill="#525252"></polygon>
                <path d="m16,10c0-3.314-2.686-6-6-6-1.227,0-2.367.368-3.317,1" fill="none" stroke="#525252" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></path>
              </g>
             
            </g>
          </svg>
        </button>
        <p className="font-semibold text-5xl">{percentage}%</p>
        <div className="inline-flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <g>
              <polygon points="11 3 9 9 16 9 9 17 11 11 4 11 11 3" stroke="#525252" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill="#525252"></polygon>
            </g>
          </svg>
          <span className="">Charging</span>
        </div>
        <div className="inline-flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <g>
              <path d="M4.75,6.5c-.414,0-.75,.336-.75,.75v3.5c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-3.5c0-.414-.336-.75-.75-.75Z" fill="#525252"></path>
              <path d="M7.5,6.5c-.414,0-.75,.336-.75,.75v3.5c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-3.5c0-.414-.336-.75-.75-.75Z" fill="#525252"></path>
              <path d="M10.25,6.5c-.414,0-.75,.336-.75,.75v3.5c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-3.5c0-.414-.336-.75-.75-.75Z" fill="#525252"></path>
              {/* <path d="M13,6.5c-.414,0-.75,.336-.75,.75v3.5c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-3.5c0-.414-.336-.75-.75-.75Z" fill="#212121"></path>  */}
              <path d="M17.25,7h-.75v-.75c0-1.517-1.233-2.75-2.75-2.75H3.75c-1.517,0-2.75,1.233-2.75,2.75v5.5c0,1.517,1.233,2.75,2.75,2.75H13.75c1.517,0,2.75-1.233,2.75-2.75v-.75h.75c.414,0,.75-.336,.75-.75v-2.5c0-.414-.336-.75-.75-.75Zm-2.25,4.75c0,.689-.561,1.25-1.25,1.25H3.75c-.689,0-1.25-.561-1.25-1.25V6.25c0-.689,.561-1.25,1.25-1.25H13.75c.689,0,1.25,.561,1.25,1.25v5.5Z" 
              fill="#525252"></path>
            </g>
          </svg>
          <span>96% <span className="">battery health</span></span>
        </div>
        <div className="inline-flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <g fill="#212121">
              <path d="m10,6h-4c-1.657,0-3,1.343-3,3v2c0,1.657,1.343,3,3,3" fill="none" stroke="#525252" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
              <path d="m10,14h4c1.657,0,3-1.343,3-3v-2c0-1.657-1.343-3-3-3" fill="none" stroke="#525252" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
              <polyline points="12.75 11.25 10 14 12.75 16.75" fill="none" stroke="#525252" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></polyline>
              <polyline points="7.25 8.75 10 6 7.25 3.25" fill="none" stroke="#525252" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></polyline>
            </g>
          </svg>
          <span>215 <span className="text-ken-grey">cycles</span></span>
        </div>
        <div className="flex relative mt-6  gap-2 overflow-hidden w-full">
          <motion.span layout style={{
            width: `${percentage}%`
          }} className="h-1 inline-block  bg-green-400 z-20 absolute animate-mask"/>
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} className="h-1 after:z-30 relative after:absolue after:content-[''] after:h-full after:top-0 after:absolute after:inline-block after:w-[8px] after:bg-white after:right-full inline-block w-20 bg-gray-300/50"/>
          ))}
        </div>
      <div className={cn("absolute transition-transform duration-400 ease-in-out bottom-2 text-xs right-2 bg-white shadow-sm px-2 rounded-md py-1", showN ? "translate-y-0" : "translate-y-[150%]")}>
        <button onClick={() => setShowN(false)} className="bg-gray-100 border border-dashed grid place-items-center rounded-full size-3 absolute -top-1 -right-1">
            <svg className="size-2" viewBox="0 0 48 48">
              <g fill="#212121" stroke-linejoin="round" stroke-linecap="round">
              <line fill="none" stroke="#212121" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="38" y1="10" x2="10" y2="38" stroke-linejoin="round"></line> 
              <line fill="none" stroke="#212121" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" x1="38" y1="38" x2="10" y2="10" stroke-linejoin="round"></line>
              </g></svg>
            <span className="sr-only">Dismiss notification</span>
          </button>
          Fully Charged</div>
    </div>
  )
}
