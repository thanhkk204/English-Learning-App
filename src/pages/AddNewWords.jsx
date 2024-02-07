import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useActionData, useFetcher, useFormAction } from "react-router-dom"
import { toast } from "react-toastify"
export const action = async ({ request }) => {
  try {
    const formData = await request.formData()
    const meaning = formData.get("meaning")
    const vocab = formData.get("vocab")
    const createAt = new Date()
    const result = await axios.post("http://localhost:3000/Vocabbulary", {
      vocab: vocab,
      meaning: meaning,
      createAt: createAt
    })
    if (result) {
      return result.data
    }
  } catch (error) {
    throw new Error("Bạn đã thêm thất bại")
  }
}
export default function AddNewWords() {
  const [vob, setVob] = useState("")
  const [meaning, setMeaning] = useState("")
  const fetcher = useFetcher()
  const inputRef = useRef()
  const inputRef2 = useRef()
  const notify = (vob)=> toast("Bạn đã thêm thành công "+vob)

  useEffect(() => {
    function handleKeydonwn(e) {
      if (e.keyCode === 38 && inputRef.current) {
        inputRef.current.focus()
      }
      if (e.keyCode === 40 && inputRef.current) {
        inputRef2.current.focus()
      }
    }
    window.addEventListener("keydown", handleKeydonwn)
    return () => window.removeEventListener("keydown", handleKeydonwn)
  })
  useEffect(() => {
    setVob("")
    setMeaning("")
    if (fetcher.data) {
      inputRef.current.focus()
      notify(fetcher.data.vocab)
    }
  }, [fetcher.data])
  return (
    <Container>
      <Row>
        <Col>
          <fetcher.Form method="post" action="/add" id="addForm">
            <input
              type="text"
              name="vocab"
              placeholder="Vocabulary"
              autoComplete="off"
              required="required"
              value={vob}
              ref={inputRef}
              onChange={(e) => setVob(e.currentTarget.value)}
            />
            <input
              type="text"
              name="meaning"
              placeholder="Meaning"
              autoComplete="off"
              value={meaning}
              required="required"
              ref={inputRef2}
              onChange={(e) => setMeaning(e.currentTarget.value)}
            />
            <button type="submit" className="btn btn-outline-success">
              Add
            </button>
          </fetcher.Form>
          {fetcher.data === "Bạn đã thêm thất bại" && <div>{fetcher.data}</div>}
        </Col>
      </Row>
    </Container>
  )
}
