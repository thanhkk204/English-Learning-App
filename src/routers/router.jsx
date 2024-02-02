import React from "react"
import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import ErrorPage from "../error-page"
import GetNewWord from "../Component/GetNewWord"
import {
  loader as loaderVob,
  action as actionVob,
} from "../Component/GetNewWord"
import Check from "../Component/Check"
export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true , element: <GetNewWord /> ,  loader: loaderVob,},
      {
        path: "vob",
        element: <GetNewWord />,
        loader: loaderVob,
        action: actionVob,
      },
      {
        // path: "vob/:id",
        // element: <GetNewWord />,
        // action: actionVob,
      },
    ],
  },
])
