import { Link, useRouteError } from "react-router-dom";
import React from "react";
export default function ErrorPage() {
  const error = useRouteError();
  console.log(error)
  return (
    <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center row">
   
        <div class=" col-md-6 mt-5">
            <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
            <p class="lead">
              {error.message}
            </p>
            <Link to="/" class="btn btn-primary">Go Home</Link>
        </div>

    </div>
</div>
  );
}