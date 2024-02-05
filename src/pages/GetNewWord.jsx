import React, { useEffect, useRef, useState } from "react"
import { Button, Stack, Container, Row, Col } from "react-bootstrap"
import { useLoaderData } from "react-router"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { BiTransfer } from "react-icons/bi"
import DaysForWords from "../Component/daysForWords"
import { restartVocab, validateString } from "../utilities/feature"
export const loader = async () => {
  const data = await axios.get("http://localhost:3000/Vocabbulary")
  if (data) {
    return data.data
  } else {
    throw new Error("Something wrong with server")
  }
}

function GetNewWord() {
  const navigate = useNavigate()
  const loader = useLoaderData()
  const [vocabularyProp, setVocabularyProp] = useState()
  const [number, setNumber] = useState(null)
  const [simpleWord, setSimpleWord] = useState()
  const [userInput, setUserInput] = useState("")
  const [engLangue, setEngLangue] = useState(true)
  const inputRef = useRef()
  const nextWordRef = useRef()
  const notify = () => toast("Hết từ rồi nha bé")

  const notifyWrong = () => toast("Fail rồi nhập lại hoặc next đi!!~")
  const notifyTranferation = (lang) => toast(`Bạn đã chuyển sang ${lang}`)

  // Gắn sự kiện keydown cho 2 phím
  useEffect(() => {
    function handleKeydonwn(e) {
      if (e.keyCode === 32 && inputRef.current) {
        inputRef.current.focus()
      }
      if (e.keyCode === 39 && nextWordRef.current) {
        filterWords()
      }
    }
    window.addEventListener("keydown", handleKeydonwn)
    return () => window.removeEventListener("keydown", handleKeydonwn)
  })

  // Gắn dữ liệu từ loader vào 1 biến state
  useEffect(() => {
    setSimpleWord(null)
    loader && setVocabularyProp(loader)
    
  }, [loader])
  // Function thực thi khi ấn getNewWords
  function getNewVocab(e) {
    e.preventDefault()

    filterWords()
  }
  function filterWords() {
    if (vocabularyProp.length > 1) {
      // Lọc ra 1 mảng mới không có từ đã rander
      let newVocabulary = vocabularyProp.filter((item, index) => {
        return index != number
      })
      setVocabularyProp(newVocabulary)
      // Random số ngỗng nhiên trong mảng mới
      let numberRandom = Math.floor(Math.random() * newVocabulary.length)

      // Set lại từ để rander
      setSimpleWord(newVocabulary[numberRandom])
      // Set lại index ngỗng nhiên
      setNumber(numberRandom)
    } else {
      notify()
    }
  }
 
  // Kiểm tra từ đungs hay sai
  function checkVob(e) {
    e.preventDefault()
    if (userInput !== "") {
      let wordForCheck = engLangue
        ? loader[simpleWord["id"]].meaning
        : loader[simpleWord["id"]].vocab
      if (validateString(wordForCheck, userInput)) {
        filterWords()
        setUserInput("")
      } else {
        setUserInput(userInput)
        notifyWrong()
      }
    }
  }

  //  Chuyển đổi câu hỏi sang tiếng khác
  function langueTranfer() {
    setEngLangue(!engLangue)
    let lang = ""
    engLangue == true ? (lang = "En") : (lang = "Vn")
    notifyTranferation(lang)
  }
  
  return (
    <>
      {loader && (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row id="row_getWords">
            <DaysForWords />
            <Col id="colGetNewWord">
              {vocabularyProp &&
                vocabularyProp.length >= 1 &&
                (simpleWord ? (
                  <div className="simpleWord_wrap">
                    <div className="simpleWord">
                      {engLangue ? simpleWord.vocab : simpleWord.meaning}
                    </div>
                    <BiTransfer onClick={() => langueTranfer()} />
                  </div>
                ) : (
                  <div className="simpleWord">Keep yourself clean!!!</div>
                ))}
              {simpleWord && (
                <form>
                  <input
                    type="text"
                    name="word"
                    autoComplete="off"
                    required="required"
                    placeholder="Enter your answer"
                    ref={inputRef}
                    onChange={(e) => {
                      e.preventDefault()
                      setUserInput(e.currentTarget.value)
                      e.currentTarget.value.length >= 22 &&
                        e.currentTarget.setAttribute(
                          "style",
                          `width: ${e.currentTarget.value.length}ch`
                        )
                    }}
                    value={userInput}
                    id="getNewWordInput"
                  />
                  <button
                    onClick={checkVob}
                    className="btn btn-outline-success"
                  >
                    Search
                  </button>
                </form>
              )}

              <Stack
                direction="horizontal"
                gap={2}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button as="a" variant="success" onClick={restartVocab}>
                  Reset
                </Button>
                <Button
                  as="a"
                  variant="primary"
                  ref={nextWordRef}
                  onClick={getNewVocab}
                >
                  Get New Vocab
                </Button>
              </Stack>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default GetNewWord
