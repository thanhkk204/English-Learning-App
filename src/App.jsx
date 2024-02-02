import React, { useEffect, useRef, useState } from "react"
import "./Css/App.css"
import Header from "./pages/Header"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Outlet } from "react-router"
function App() {
  
  return (
    <Container>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Container>
  )
}

export default App
