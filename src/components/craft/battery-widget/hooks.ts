import { useEffect, useState } from "react"


interface BatteryManager {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: () => any;
  onchargingtimechange: () => any;
  ondischargingtimechange: () => any;
  onlevelchange: () => any
}
interface INavigator extends Navigator{
  getBattery:() => Promise<BatteryManager>
}

interface Battery {
  percentage: number;
  charging: boolean;
}


function useBattery(){
  const [battery, setBattery] = useState<Battery>(
    { percentage: 0.69, charging: false }
  )
  
  useEffect(() =>{
    if(!window) return
   
    async function getBattery(){
      const n = window.navigator as INavigator
      if("getBattery" in n){
        const battery = await n.getBattery()
        setBattery({percentage: battery.level, charging: battery.charging})
      }else{
        setBattery({percentage: 0.69, charging: false})
      }
    }
    getBattery()
  },[])
  return battery
}