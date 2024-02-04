import React from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Link } from "react-router-dom"
export default function Header() {
  return (
    <>
      <nav id="nav_head">
        <div>
          <p>Revising Eng App</p>
          <ul>
            <li>
              <Link to={"vob"} className="navLink">
                Get
              </Link>
            </li>
            <li>
              <Link to={"add"} className="navLink">
                Add
              </Link>
            </li>
            <li>
              <Link to={"list"} className="navLink">
                List
              </Link>
            </li>
          </ul>
        </div>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </nav>
    </>
  )
}
