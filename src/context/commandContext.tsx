import { createContext, useContext, useState } from "react";

interface CommandContextProps {
  open: boolean;
  toggleCommand: () => void;
}

const CommandContext = createContext<CommandContextProps>({
  open: false,
  toggleCommand: () => { },
});

interface CommandContextWrapperProps {
  children: React.ReactNode;
}

export const CommandContextWrapper = ({ children }: CommandContextWrapperProps) => {
  const [open, setOpen] = useState(false);

  const toggleCommand = () => {
    setOpen((open) => !open);
  };

  return (
    <CommandContext.Provider value={{ open, toggleCommand }}>
      {children}
    </CommandContext.Provider>
  );
}

export const useCommandContext = () => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error(
      "useCommandContext must be used within a CommandContextWrapper"
    );
  }
  return context;
};
