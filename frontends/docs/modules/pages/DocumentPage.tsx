import React from 'react'
import { useParams } from "react-router-dom"
import { Editor } from "@brickdoc/editor"
import { currentWebidVar } from "@/docs/vars"

const Page: React.FC = () => {
  const { webid, docid } = useParams()
  currentWebidVar(webid)
  return <div>
    <h1>WIP - ${webid} ${docid}</h1>
    <Editor />
  </div>
}
export default Page
