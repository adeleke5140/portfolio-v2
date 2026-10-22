import { highlight } from 'sugar-high'

export const InitialCodeBlock = () => {
  const codeHTML = highlight(`fn main(){
 println!("Hello World");
}`)
  return (
    <pre
      style={{
        background: '#fafafa',
        border: '1px solid #e5e7eb',
      }}
      className="text-sm"
    >
      <code dangerouslySetInnerHTML={{ __html: codeHTML }} />
    </pre>
  )
}

export const FinalCodeBlock = () => {
  const codeHTML = highlight(`fn main(){
 println!("Hello World");
}`)
  return (
    <pre className="text-sm">
      <code dangerouslySetInnerHTML={{ __html: codeHTML }} />
    </pre>
  )
}
