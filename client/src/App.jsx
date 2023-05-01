import Demo from "./components/Demo";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
// import Error from "./components/Error";

function App() {
  const user = JSON.parse(localStorage.getItem("token"));
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<Home user={user}/>} />
            <Route exact path="/main" element={<Demo />} />
            <Route exact path="/signin" element={<Login  user={user} />} />
            {/* {user?(<Route exact path="/signin" element={<Login/>} />):(<Route exact path="/error" element={<Error title={"You are already Logged in"} />} />)} */}
            <Route exact path="/signup" element={<Signup user={user}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;
