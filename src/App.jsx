import React, { useEffect, useRef, useState } from "react"
import "./Css/App.css"
import 'react-toastify/dist/ReactToastify.css';
import Header from "./pages/Header"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify"
function App() {
  
  return (
    <Container>
      <Header />
      <ToastContainer />
      <Container id="outlet_container">
        <Outlet />
      </Container>
    </Container>
  )
}

export default App
