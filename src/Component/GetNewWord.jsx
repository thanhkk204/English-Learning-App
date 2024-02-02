import React, { useEffect, useState } from "react"
import { Button, Stack, Container, Row, Col } from "react-bootstrap"
import { useActionData, useLoaderData } from "react-router"
import { Form, useNavigate, useFetcher } from "react-router-dom"
import axios from "axios"
export const loader = async () => {
  const data = await axios.get("http://localhost:3000/Vocabbulary")
  console.log('data trong loader:')
  console.log(data.data)
  console.log('-----------')
  return data
}
export const action = async ({ request, params }) => {
  const formData = await request.formData()
  console.log(formData.get("word"))
  // const data = await axios.get(`http://localhost:3000/Vocabbulary/${params.id}`)
  // console.log(data)
  return formData
}

function GetNewWord() {
  const dataAction = useActionData()
  const navigate = useNavigate()
  const vob = useLoaderData()
  const fetcher = useFetcher()
  const [vocabularyProp, setVocabularyProp] = useState(vob.data)
  const [number, setNumber] = useState(0)
  const [simpleWord, setSimpleWord] = useState()
  console.log(vocabularyProp);
  useEffect(()=>{setVocabularyProp(vob.data)},[vob])
  function getNewVocab(e) {
    e.preventDefault()
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
      console.log("implement")
    } else {
      console.log("Non-implement")
      alert("Hết từ học rồi nha con")
    }
  }
  //   restart vocab
  function restartVocab() {
    const confirmRestart = confirm("Mày có muốn ôn lại tất cả từ vựng không")
    confirmRestart && navigate("")
  }
  return (
    <>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <Row width={500}>
          <Col>
            {vocabularyProp &&
              vocabularyProp.length >= 1 &&
              (simpleWord ? (
                <div>{simpleWord.vocab}</div>
              ) : (
                <div>{vocabularyProp[number].vocab}</div>
              ))}

            <fetcher.Form method="POST" action={"/vob"}>
              <input type="text" name="word" />
              <button type="submit" onClick={(e)=>e.preventDefault()}>Gửi</button>
            </fetcher.Form>
            <Stack direction="horizontal" gap={2}>
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
    </>
  )
}

export default GetNewWord
