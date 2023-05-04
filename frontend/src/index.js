import { render } from "react-dom";
import App from "./container/App";
import 'react-toastify/dist/ReactToastify.css';
import "./bootstrap.css";
import "./responsive.css";
import "./style.css";
import "./all.css";
// import "./bootstrap.js"

import { BrowserRouter, Router } from "react-router-dom"

render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"))