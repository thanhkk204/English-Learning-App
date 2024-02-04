import React, { useEffect, useState } from "react"
import { Button, Stack, Container, Row, Col } from "react-bootstrap"
import { useLoaderData } from "react-router"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { BiTransfer } from "react-icons/bi";
export const loader = async () => {
  const data = await axios.get("http://localhost:3000/Vocabbulary")
  if (data) {
    return data
  }else{
    throw new Error('Something wrong with server')
  }
}

function GetNewWord() {
  const navigate = useNavigate()
  const vob = useLoaderData()
  const [vocabularyProp, setVocabularyProp] = useState()
  const [number, setNumber] = useState(null)
  const [simpleWord, setSimpleWord] = useState()
  const [userInput, setUserInput] = useState("")
  const notify = () => toast("Hết từ rồi nha bé")
  
  const notifyWrong = () => toast("Fail rồi nhập lại hoặc next đi!!~")
  useEffect(() => {
    vob && setVocabularyProp(vob.data)
  }, [vob])

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
  //   restart vocab
  function restartVocab() {
    const confirmRestart = confirm("Mày có muốn ôn lại tất cả từ vựng không")
    if (confirmRestart) {
      setVocabularyProp("")
      setSimpleWord("")
      setNumber(null)
      navigate("")
    }
  }
  // Kiểm tra từ đungs hay sai
  function checkVob(e) {
    e.preventDefault()
    setUserInput("")
    if (vob.data[simpleWord["id"]].vocab.toLowerCase() === userInput.toLowerCase()) {
      filterWords()
    } else {
      notifyWrong()
    }
  }
  return (
    <>
      {vob.data && (
        <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <Row>
          <Col id="colGetNewWord">
            {vocabularyProp &&
              vocabularyProp.length >= 1 &&
              (simpleWord ? (
                <div  className="simpleWord_wrap">
                <div className="simpleWord">{simpleWord.meaning}</div>
                <BiTransfer />
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
                  onChange={(e) => {
                    e.preventDefault()
                    setUserInput(e.currentTarget.value)
                  }}
                  value={userInput}
                  id="getNewWordInput"
                />
                <button
                  type="submit"
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
              <Button as="a" variant="primary" onClick={getNewVocab}>
                Get New Vocab
              </Button>
              <Button as="a" variant="success" onClick={restartVocab}>
                Reset
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
