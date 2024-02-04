import axios from "axios"
import React, { useEffect, useState } from "react"
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
  const notify = (vob)=> toast("Bạn đã thêm thành công "+vob)
  useEffect(() => {
    setVob("")
    setMeaning("")
    if (fetcher.data) {
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
              value={vob}
              onChange={(e) => setVob(e.currentTarget.value)}
            />
            <input
              type="text"
              name="meaning"
              placeholder="Meaning"
              autoComplete="off"
              value={meaning}
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
