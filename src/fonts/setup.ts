import localFont from '@next/font/local'

export const satoshiFont = localFont({
    src: [
        {
            path: './Satoshi/Satoshi-Light.otf',
            weight: '300',
            style: 'normal'
        },
        {
            path: './Satoshi/Satoshi-LightItalic.otf',
            weight: '300',
            style: 'italic'
        },
        {
            path: './Satoshi/Satoshi-Regular.otf',
            weight: '400',
            style: 'normal'
        },
        {
            path: './Satoshi/Satoshi-Italic.otf',
            weight: '400',
            style: 'italic'
        },
        {
            path: './Satoshi/Satoshi-Medium.otf',
            weight: '500',
            style: 'normal'
        },
        {
            path: './Satoshi/Satoshi-MediumItalic.otf',
            weight: '500',
            style: 'italic'
        },
        {
            path: './Satoshi/Satoshi-Bold.otf',
            weight: '700',
            style: 'normal'
        },
        {
            path:'./Satoshi/Satoshi-BoldItalic.otf',
            weight: '700',
            style: 'italic'
        },
        {
            path: './Satoshi/Satoshi-Black.otf',
            weight: '900',
            style: 'normal'
        },
        {
            path: './Satoshi/Satoshi-BlackItalic.otf',
            weight: '900',
            style: 'italic'
        }
    ],
    variable: "--font-satoshi",
    display: 'swap'
})

export const erodeFont = localFont({
    src: [
        {
            path:'./Erode/Erode-Light.otf',
            weight:'300',
            style:"normal"
        },
        {
            path:'./Erode/Erode-LightItalic.otf',
            weight:'300',
            style:"italic"
        },
        {
            path: './Erode/Erode-Regular.otf',
            weight:'400',
            style:"normal"
        },
        {
            path:'./Erode/Erode-Italic.otf',
            weight:"400",
            style:"italic"
        },
        {
            path:'./Erode/Erode-Medium.otf',
            weight:"500",
            style:"normal"
        },
        {
            path:'./Erode/Erode-MediumItalic.otf',
            weight:"500",
            style:"italic"
        },
        {
            path:'./Erode/Erode-Semibold.otf',
            weight:"600",
            style:"normal"
        },
        {
            path:'./Erode/Erode-SemiboldItalic.otf',
            weight:"600",
            style:"italic"
        },
        {
            path:'./Erode/Erode-Bold.otf',
            weight:"700",
            style:"normal",
        },
        {
            path: './Erode/Erode-BoldItalic.otf',
            weight:"700",
            style:"italic",
        }
    ],
    variable: "--font-erode",
    display: 'swap'
})