import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import {
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Pagination,
  Row,
  Table,
} from "react-bootstrap"
import { useLoaderData } from "react-router"
import moment from "moment"
export const loader = async ({ request }) => {
  const listWords = await axios.get("http://localhost:3000/Vocabbulary")
  return listWords.data
}
export default function ListWords() {
  const listWords = useLoaderData()
  const [pageNumber, setPageNumber] = useState(0)
  const [panigationWords, setPanigationWords] = useState()
  const [totalPages, setTotalPages] = useState(Math.ceil(listWords.length / 7))
  const [maximumPages, setMaximumPages] = useState(2)
  const [minimumPages, setMinimumPages] = useState(0)
  const rightSide = useRef()
  const leftSide = useRef()
   
  // const [togglePanigation, setTogglePanigation] = useState(false)
  
  useEffect(() => {
    function handleKeydonwn(e) {
      if (e.keyCode === 37 && leftSide.current) {
        pageNumber > 0 && setPageNumber(pageNumber - 1)
      }
      if (e.keyCode === 39 && rightSide.current) {
        pageNumber < totalPages - 1 && setPageNumber(pageNumber + 1)
      }
    }
    window.addEventListener("keydown", handleKeydonwn)
    return () => window.removeEventListener("keydown", handleKeydonwn)
  })

  useEffect(() => {
    const startIndex = 7 * pageNumber - 1
    const endIndex = startIndex + 7
    const words = listWords.filter((item, index) => {
      return index > startIndex && index <= endIndex
    })
    setPanigationWords(words)
  }, [pageNumber])
  useEffect(() => {
    if (pageNumber + 2 > 2) {
      setMaximumPages(pageNumber + 2)
      setMinimumPages(pageNumber - 2)
    }
  }, [pageNumber])
  function getMorePages(e) {
    setMaximumPages(maximumPages + 2)
    setMinimumPages(minimumPages + 2)
  }
  return (
    <Container id="list_container">
      <Row id="list_row">
        <table id="ListWords">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vocabulary</th>
              <th>Meaning</th>
              <th>CreateAt</th>
              <th>Features</th>
            </tr>
          </thead>
          <tbody>
            {panigationWords &&
              panigationWords.map((item, index) => {
                const createAt = moment(item.createAt)
                const formattedDate = createAt.format("DD/MM/YYYY")
                return (
                  <tr key={item.id + 1}>
                    <td>{item.id + 1}</td>
                    <td>{item.vocab}</td>
                    <td>{item.meaning}</td>
                    <td>{formattedDate}</td>
                    <td>
                      <Button variant="outline-success">Success</Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </Row>
      <Row id="list_panigation">
        <Col>
          <Pagination>
            <Pagination.First
              onClick={(e) => {
                setPageNumber(0)
              }}
            />
            <Pagination.Prev
              ref={leftSide}
              onClick={(e) => {
                pageNumber > 0 && setPageNumber(pageNumber - 1)
              }}
            />
            {totalPages &&
              [...Array(totalPages).keys()].map(
                (item, index) =>
                  index < maximumPages &&
                  index >= minimumPages &&
                  index < totalPages - 1 && (
                    <Pagination.Item
                      className={index == pageNumber ? "active" : ""}
                      key={item}
                      onClick={(e) => setPageNumber(item)}
                    >
                      {item + 1}
                    </Pagination.Item>
                  )
              )}

            {totalPages - maximumPages >= 1 && (
              <Pagination.Ellipsis onClick={getMorePages} />
            )}

            <Pagination.Item
              className={totalPages == pageNumber + 1 ? "active" : ""}
              onClick={(e) => setPageNumber(totalPages - 1)}
            >
              {totalPages}
            </Pagination.Item>

            <Pagination.Next
            ref={rightSide}
              onClick={(e) => {
                pageNumber < totalPages - 1 && setPageNumber(pageNumber + 1)
              }}
            />
            <Pagination.Last onClick={(e) => setPageNumber(totalPages - 1)} />
            <div
              id="hidden_panagation"
              onClick={(e) => {
                setMaximumPages(2)
                setMinimumPages(0)
                setPageNumber(0)
              }}
            >
              Ẩn
            </div>
          </Pagination>
        </Col>
        <Col>
          <div id="pageNumber">
            Page {pageNumber + 1} of {totalPages}
          </div>
        </Col>
      </Row>
    </Container>
  )
}
