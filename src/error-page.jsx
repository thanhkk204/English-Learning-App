import { useRouteError } from "react-router-dom";
import React from "react";
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center row">
    <div class=" col-md-6">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ80j4gdsCC_DfYtPFHQJKfRjak8nS8jWWP6w&usqp=CAU"  class="img-fluid"/>
        </div>
        <div class=" col-md-6 mt-5">
            <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
            <p class="lead">
              {error}
            </p>
            <a href="index.html" class="btn btn-primary">Go Home</a>
        </div>

    </div>
</div>
  );
}