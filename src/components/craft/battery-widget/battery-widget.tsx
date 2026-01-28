/*todo
read from the user battery's percentage
might need some permission stuff
*/
import { cn } from "@/lib/utils"

const PlusIcon = ({ className }: { className: string }) => <svg className={className} viewBox="0 0 32 32"><g fill="#525252"><path d="M29,14h-11V3c0-.553-.447-1-1-1h-2c-.553,0-1,.447-1,1V14H3c-.553,0-1,.447-1,1v2c0,.553,.447,1,1,1H14v11c0,.553,.447,1,1,1h2c.553,0,1-.447,1-1v-11h11c.553,0,1-.447,1-1v-2c0-.553-.447-1-1-1Z" fill="#525252"></path></g></svg>
const Dot = ({ className }: { className: string }) => <span className={cn("absolute inline-block size-2 bg-ken-grey", className)}></span>
export const BatteryWidget = () => {
  return (
      <div className="bg-white px-6 border border-dashed relative w-80 py-8 flex flex-col gap-4">
        <p className="font-semibold text-5xl">{0.69 * 100}%</p>
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
          <span className="w-[69%] h-1 inline-block  bg-green-400 z-20 absolute animate-mask"/>
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} className="h-1 after:z-30 relative after:absolue after:content-[''] after:h-full after:top-0 after:absolute after:inline-block after:w-[8px] after:bg-white after:right-full inline-block w-20 bg-gray-300/50"/>
          ))}
        </div>
    </div>
  )
}
