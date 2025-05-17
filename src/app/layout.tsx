import RootLayout from "@/components/root-layout"
import '@/styles/globals.css'

 export default function Layout({
   children,
 }: {
   children: React.ReactNode
 }) {
   return (
     <html lang="en">
       <body>
         <RootLayout>{children}</RootLayout>
       </body>
     </html>
   )
 }