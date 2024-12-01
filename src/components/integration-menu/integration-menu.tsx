import { AnimatePresence, Variants, motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

const copyVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
  },
}

const integrations = [
  {
    name: 'github',
    icon: (
      <svg
        height="32"
        aria-hidden="true"
        viewBox="0 0 24 24"
        version="1.1"
        width="32"
        data-view-component="true"
        className="h-4 w-4"
      >
        <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
      </svg>
    ),
  },
  {
    name: 'figma',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="49"
        fill="none"
        viewBox="0 0 33 49"
        aria-label="Homepage"
        className="w-4 h-4"
      >
        <path
          fill="#00B6FF"
          d="M16.5 23.612a7.28 7.28 0 0 1 7.28-7.279h1.053a8.167 8.167 0 1 1 0 16.333H23.78a7.28 7.28 0 0 1-7.279-7.279z"
        ></path>
        <path
          fill="#24CB71"
          d="M0 40.834a8.167 8.167 0 0 1 8.167-8.167H16.5v8.083c0 4.557-3.735 8.25-8.292 8.25C3.698 49 0 45.344 0 40.834"
        ></path>
        <path
          fill="#FF7237"
          d="M16.5 0v16.333h8.333a8.167 8.167 0 1 0 0-16.333z"
        ></path>
        <path
          fill="#FF3737"
          d="M0 8.166a8.167 8.167 0 0 0 8.167 8.167H16.5V0H8.167A8.167 8.167 0 0 0 0 8.166"
        ></path>
        <path
          fill="#874FFF"
          d="M0 24.5a8.167 8.167 0 0 0 8.167 8.167H16.5V16.334H8.167A8.167 8.167 0 0 0 0 24.5"
        ></path>
      </svg>
    ),
  },
  {
    name: 'slack',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="54"
        height="54"
        viewBox="0 0 54 54"
        role="presentation"
        className="w-4 h-4"
      >
        <g fill="none" fill-rule="evenodd">
          <path
            d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386"
            fill="#44BEDF"
          />
          <path
            d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387"
            fill="#2EB67D"
          />
          <path
            d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386"
            fill="#ECB22E"
          />
          <path
            d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387"
            fill="#E01E5A"
          />
        </g>
      </svg>
    ),
  },
  {
    name: 'linear',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 100 100"
        fill="currentColor"
        className="w-4 h-4"
        aria-label="Linear Logo"
        color="currentColor"
      >
        <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5964C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228ZM.00189135 46.8891c-.01764375.2833.08887215.5599.28957165.7606L52.3503 99.7085c.2007.2007.4773.3075.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L2.57595 39.4485c-.55186-.5519-1.49117-.2863-1.648174.4782-.465915 2.2686-.77832 4.5932-.92588465 6.9624ZM4.21093 29.7054c-.16649.3738-.08169.8106.20765 1.1l64.77602 64.776c.2894.2894.7262.3742 1.1.2077 1.7861-.7956 3.5171-1.6927 5.1855-2.684.5521-.328.6373-1.0867.1832-1.5407L8.43566 24.3367c-.45409-.4541-1.21271-.3689-1.54074.1832-.99132 1.6684-1.88843 3.3994-2.68399 5.1855ZM12.6587 18.074c-.3701-.3701-.393-.9637-.0443-1.3541C21.7795 6.45931 35.1114 0 49.9519 0 77.5927 0 100 22.4073 100 50.0481c0 14.8405-6.4593 28.1724-16.7199 37.3375-.3903.3487-.984.3258-1.3542-.0443L12.6587 18.074Z"></path>
      </svg>
    ),
  },
  {
    name: 'vercel',
    icon: (
      <svg
        data-testid="geist-icon"
        height="16"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="16"
        aria-label="Vercel logo"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 1L16 15H0L8 1Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
]

export const CopyButton = () => {
  const [copy, setCopy] = useState(false)

  useEffect(() => {
    if (copy)
      setTimeout(() => {
        setCopy(false)
      }, 1500)
  }, [copy])
  return (
    <button aria-label="copy pr link" onClick={() => setCopy(true)}>
      <AnimatePresence mode="wait" initial={false}>
        {copy ? (
          <motion.span
            key="checkmark"
            variants={copyVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          >
            <Check className="w-3 h-3 text-gray-500" />
          </motion.span>
        ) : (
          <motion.span
            key="clipboard"
            variants={copyVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          >
            <Copy className="w-3 h-3 text-gray-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

export const IntegrationMenu = () => {
  const [current, setCurrent] = useState('github')
  return (
    <div className="w-[24.75rem] flex flex-col gap-2  cursor-pointer border-[0.5px]  border-gray-200 bg-white mx-auto p-1.5 rounded-2xl ">
      <div className="bg-[#f7f8fa] flex flex-col gap-1 rounded-xl p-3 font-mono">
        <div className="flex group  items-center justify-between border-b border-dashed pb-1">
          <span className="text-sm inline-flex gap-1 items-center">
            <span className="text-[#3fb950]">
              <svg
                className="size-4"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
              </svg>
            </span>
            <span className="text-gray-500">#380</span>
          </span>

          <div className="flex gap-2 overflow-hidden pl-10 relative items-center">
            <p className="text-sm relative transition-transform duration-300 delay-75 group-hover:-translate-x-5  text-blue-700 font-medium">
              fix-checkout-process
            </p>

            <div className="-right-4 group-hover:-translate-x-4 transition-transform duration-300 delay-75 absolute">
              <CopyButton />
            </div>
          </div>
        </div>
        <div className="flex group items-center justify-between border-b border-dashed pb-1">
          <span className="text-sm inline-flex gap-1 items-center">
            <span className="text-[#ab7df8]">
              <svg
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"></path>
              </svg>
            </span>
            <span className="text-gray-500">#346</span>
          </span>
          <div className="flex gap-2 overflow-hidden pl-10 relative items-center">
            <p className="text-sm relative transition-transform duration-300 delay-75 group-hover:-translate-x-5  text-blue-700 font-medium">
              update-api-docs
            </p>
            <div className="-right-4 group-hover:-translate-x-4 transition-transform duration-300 delay-75 absolute">
              <CopyButton />
            </div>
          </div>
        </div>
        <div className="flex group items-center justify-between">
          <span className="text-sm inline-flex gap-1 items-center">
            <span className="text-[#ab7df8]">
              <svg
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"></path>
              </svg>
            </span>
            <span className="text-gray-500">#205</span>
          </span>
          <div className="flex gap-2 overflow-hidden pl-10 relative items-center">
            <p className="text-sm relative transition-transform duration-300 delay-75 group-hover:-translate-x-5  text-blue-700 font-medium">
              payment-gateway
            </p>
            <div className="-right-4 group-hover:-translate-x-4 transition-transform duration-300 delay-75 absolute">
              <CopyButton />
            </div>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden">
        {integrations.map((integration) => (
          <button
            onClick={() => setCurrent(integration.name)}
            key={integration.name}
            className="relative pb-0.5 py-1 px-2"
          >
            {current == integration.name ? (
              <motion.span
                layoutId="im"
                style={{
                  borderRadius: 9999,
                }}
                className="absolute z-10 inset-0 bg-gray-100 mix-blend-darken"
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6,
                }}
              />
            ) : null}
            <span className="inline-flex items-center gap-2">
              {integration.icon}
              <span className="text-sm capitalize">{integration.name}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
