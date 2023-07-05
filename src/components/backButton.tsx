import Link from "next/link";

interface BackButtonProps {
  path: string;
  text: string;
}

const BackButton = ({ path, text }: BackButtonProps) => {
  return (
    <div className="md:absolute -left-40 top-80 font-satoshi">
      <Link
        href={path}
        className="flex font-mono gap-2 w-fit p-1 px-2 items-center font-extrabold text-button-text md:transition-transform ease-out duration-200 bg-button-bg md:bg-inherit md:hover:bg-button-bg md:-translate-x-1 md:hover:translate-x-0 rounded"
      >
        {text}
      </Link>
    </div>
  );
};

export { BackButton };
