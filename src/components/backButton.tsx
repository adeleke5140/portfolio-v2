import Link from "next/link";

const BackButton = () => {
  return (
    <div>
      <Link href="/" className="back">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </div>
        Back
      </Link>
    </div>
  );
};

export { BackButton };
