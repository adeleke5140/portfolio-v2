'use client'
import Prism from 'prismjs'
import { useEffect } from 'react'

require('prismjs/components/prism-javascript')
require('prismjs/components/prism-typescript')

export const BlogContent = (content: {
  contentHtml: string
  language: string
}) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <section
      className={`mt-10 font-sans selection:bg-[#dfdad9] font-normal prose language-${content.language}`}
      dangerouslySetInnerHTML={{ __html: content.contentHtml }}
    ></section>
  )
}
