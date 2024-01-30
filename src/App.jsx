import React, { useEffect, useRef, useState } from "react"
import GetNewWord from "./Component/getNewWord"
import "./Css/App.css"
import axios from "axios"
function App() {
  const [vocabulary , setVocabulary] = useState()
  
  useEffect(()=>{
    const getVocab = async ()=>{
      const res = await axios.get("http://localhost:3000/Vocabbulary")
      setVocabulary(res.data)
    }
    getVocab()
  },[])

  
  return (
    <>
     <GetNewWord vocabulary={vocabulary}/>
    </>
  )
}

export default App
