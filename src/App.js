import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Userlist from "./Userlist";
import Edituser from "./Edituser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userlist" element={<Userlist />} />
          <Route path="/edituser/:id" element={<Edituser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
