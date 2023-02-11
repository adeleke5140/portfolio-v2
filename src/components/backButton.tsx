import Link from "next/link";

interface BackButtonProps {
  path: string;
  text: string;
}

const BackButton = ({ path, text }: BackButtonProps) => {
  return (
    <div className="md:absolute -left-40 top-80">
      <Link
        href={path}
        className="flex gap-2 w-fit p-1 px-2 items-center font-extrabold text-button-text transition-transform ease-out duration-200 hover:bg-button-bg -translate-x-1 hover:translate-x-0 rounded"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </div>
        {text}
      </Link>
    </div>
  );
};

export { BackButton };
