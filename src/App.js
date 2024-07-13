
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

function App() {
      const message = "This is a very important message!"
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message={message}/>

          <Routes>
            <Route path="/" element={
              <>
                <Home />
              </>
            } />


            <Route path="/about" element={
              <>
                <About />
              </>} />

          </Routes>
        </Router >
      </NoteState>




    </>
  );
}

export default App;
