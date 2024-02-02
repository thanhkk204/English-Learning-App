import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import {default as routerRoot} from './routers/router';
import { ThemeProvider } from 'react-bootstrap';

const router = routerRoot

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider
  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  minBreakpoint="xxs"
>
    <RouterProvider router={router}>

    </RouterProvider>
</ThemeProvider>
  </React.StrictMode>,
)
