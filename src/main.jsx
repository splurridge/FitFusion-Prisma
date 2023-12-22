import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./components/Landing.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import About from './components/About.jsx'
import Contact from "./components/Contact.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <Router>
      <Routes>
      <Route exact path="/" element={<Landing/>} />
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>

      <Route path="/admin" element={<AdminLogin/>} />
      <Route path="/admin-dashboard" element={<AdminDashboard/>} />
    </Routes>
    </Router>
  </div>
);
