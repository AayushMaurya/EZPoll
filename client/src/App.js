import React from "react";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import setAuthToken from "./utils/setAuthToken";
import decodeToken from "./utils/decodeToken";
import { useSelector } from "react-redux";
import { setAdmin } from "./redux/actions/adminAction";
import store from "./redux/store";
import Home from "./pages/Home";
import { adminLogout } from "./redux/actions/adminAction";
import Poll from "./pages/Poll";
import AdminSignup from "./pages/admin/AdminSignup";
import CreatePoll from "./pages/poll/CreatePoll";
import ClientLogin from "./pages/client/ClientLogin";
import ClientSignup from "./pages/client/ClientSignup";
import ClientHome from "./pages/client/ClientHome";

if (window.localStorage.adminJwtToken) {

  console.log("this is problem")
  const decode = decodeToken(localStorage.adminJwtToken);
  const currentTime = Date.now() / 1000;
  
  if (decode.exp < currentTime) {
    store.dispatch(adminLogout());
    window.location.href = '/';
  }
  else {
    setAuthToken(localStorage.adminJwtToken);
    store.dispatch(setAdmin(decode));
  }

}

function App() {
  const store = useSelector((store) => store);

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/adminLogin' element={<AdminLogin />} />
          <Route exact path='/admin' element={<AdminHome />} />
          <Route exact path='/adminSignup' element={<AdminSignup />} />
          <Route exact path='/clientLogin' element={<ClientLogin />} />
          <Route exact path='/clientSignup' element={<ClientSignup />} />
          <Route exact path='/client' element={<ClientHome />} />
          <Route exact path='/createPoll' element={<CreatePoll />} />
          <Route path="/poll/:id" element = {<Poll />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
