import { CornerUpLeft, Undo2 } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  path: string;
  text: string;
}

const BackButton = ({ path, text }: BackButtonProps) => {
  return (
    <div className="md:absolute -left-40 top-10">
      <Link
        href={path}
        className="flex gap-2 items-center font-serif font-[300] italic w-fit text-[17px] "
      >
        <Undo2 size={12} />
        {text}
      </Link>
    </div>
  );
};

export { BackButton };
