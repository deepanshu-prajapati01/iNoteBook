
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp"
import { useState } from "react";

function App() {

  const [alert, setAlert] = useState({
    "opacity": 0,
    "alertText": "‎",
    "alertColor": "info"
  })

  const showAlert = (message, type) => {
    setAlert({
      "opacity": 1,
      "alertText": message,
      "alertColor": type
    })


    setTimeout(() => {
      setAlert({
        "opacity": 0,
        "alertText": "‎",
        "alertColor": "info"
      })
    }, 2000);
  }





  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert opacity={alert["opacity"]} alertColor={alert["alertColor"]} alertText={alert["alertText"]} />

          <Routes>
            <Route exact path="/" element={
              <>
                <Home showAlert={showAlert} />
              </>
            } />

            <Route path="/about" element={
              <>
                <About />
              </>} />

            <Route path="/login" element={
              <>
                <Login showAlert={showAlert} />
              </>} />

            <Route path="/signup" element={
              <>
                <SignUp showAlert={showAlert} />
              </>} />

          </Routes>
        </Router >
      </NoteState>




    </>
  );
}

export default App;
