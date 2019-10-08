import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./router/App";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js" ;
import "bootstrap/dist/css/bootstrap.min.css";
import { DataProvider } from "./router/context/DataContext";

render(
    <BrowserRouter>
      <DataProvider>
        <App />
      </DataProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
