import React from "react"
import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import ErrorPage from "../error-page"
import GetNewWord from "../pages/GetNewWord"
import { loader as loaderVob } from "../pages/GetNewWord"
import { action as addAction } from "../pages/AddNewWords"
import ListWords, { loader as loaderListWords } from "../pages/ListWords"
import AddNewWords from "../pages/AddNewWords"
export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <GetNewWord />, loader: loaderVob },
      {
        path: "vob",
        element: <GetNewWord />,
        loader: loaderVob,
        errorElement: <ErrorPage />,
      },
      {
        path: "add",
        element: <AddNewWords />,
        action: addAction
      },
      {
        path: "list",
        element: <ListWords />,
        loader: loaderListWords
      },
    ],
  },
])
