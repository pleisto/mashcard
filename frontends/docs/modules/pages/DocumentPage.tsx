import React from 'react'
import { useParams } from "react-router-dom"
import { currentWebidVar } from "@/docs/vars"

const Page: React.FC = () => {
  const { webid, docid } = useParams()
  currentWebidVar(webid)
  return <div>Todo {webid} - {docid} - {currentWebidVar()}</div>
}
export default Page
