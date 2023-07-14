import { useCommandContext } from "@/context/commandContext";
import { LucideCommand } from "lucide-react";



const CommandButton = () => {
  const { toggleCommand } = useCommandContext()
  return (
    <button onClick={toggleCommand} className='p-2 rounded hover:bg-button-bg transition-color ease-out duration-150 focus:outline-none focus:ring focus:ring-button-bg'>
      <LucideCommand size={24} />
    </button>
  )
}
export { CommandButton }
