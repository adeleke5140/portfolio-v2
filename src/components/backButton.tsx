import Link from 'next/link'

interface BackButtonProps {
  path: string
  text: string
}

const BackButton = ({ path, text }: BackButtonProps) => {
  return (
    <div>
      <Link
        href={path}
        className="flex gap-2 underline items-center text-ken-grey tracking-tighter font-extralight w-fit text-sm "
      >
        <svg
          className="w-3 h-3 home-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20 6.5L17.4448 8.98386C16.6121 8.97828 15.7463 9.08581 14.8767 9.3188C14.0072 9.55178 13.2037 9.89153 12.4854 10.3127L8.23926 9.32674L9.11761 14.1907C8.79389 15.135 8.73348 16.1269 8.99221 17.0925C9.29987 18.2407 10.0169 19.1954 11 19.8962M5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          ></path>
          <path
            className="left-eye"
            d="M13.9884 14.4899C14.1717 15.1742 13.8581 15.8527 13.2879 16.0055C12.7177 16.1583 12.1068 15.7275 11.9234 15.0432C11.7401 14.359 12.0537 13.6804 12.6239 13.5276C13.1941 13.3748 13.805 13.8057 13.9884 14.4899Z"
            fill="currentColor"
          ></path>
          <path
            className="right-eye"
            d="M20.1827 12.83C20.3661 13.5143 20.0524 14.1928 19.4822 14.3456C18.912 14.4984 18.3011 14.0676 18.1178 13.3833C17.9344 12.699 18.2481 12.0205 18.8183 11.8677C19.3885 11.7149 19.9994 12.1458 20.1827 12.83Z"
            fill="currentColor"
          ></path>
          <path
            d="M18.0671 16.4955C18.1893 16.9516 17.7337 17.4701 17.0494 17.6534C16.3652 17.8367 15.7114 17.6156 15.5892 17.1594C15.4669 16.7032 15.9225 16.1848 16.6068 16.0015C17.2911 15.8181 17.9448 16.0393 18.0671 16.4955Z"
            fill="var(--primary)"
          ></path>
        </svg>
        <span>{text}</span>
      </Link>
    </div>
  )
}

export { BackButton }
