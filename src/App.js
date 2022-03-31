import React from "react";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import setAuthToken from "./utils/setAuthToken";
import { decodeToken } from "./utils/decodeToken";
import { useSelector } from "react-redux";
import { setAdmin, adminLogout } from "./redux/actions/adminAction";
import { setClient, clientLogout } from "./redux/actions/clientAction";
import { setVoter, voterLogout } from "./redux/actions/voterAction";
import store from "./redux/store";
import Poll from "./pages/Poll";
import AdminSignup from "./pages/admin/AdminSignup";
import CreatePoll from "./pages/poll/CreatePoll";
import ClientLogin from "./pages/client/ClientLogin";
import ClientSignup from "./pages/client/ClientSignup";
import ClientHome from "./pages/client/ClientHome";
import Homepage from "./pages/Homepage";
import Navbar from "./pages/Navbar";
import './pages/index.css'
import How from "./pages/How";
import About from "./pages/About";
import PollResult from "./pages/poll/PollResult";
import OngoingPolls from "./pages/poll/OngoingPolls";
import ClientDashboard from "./pages/client/ClientDashboard";
import CreateVote from "./pages/vote/CreateVote";
import VoterLogin from "./pages/voter/VoterLogin";
import VoterHome from "./pages/voter/VoterHome";
import Vote from "./pages/vote/Vote";
import { setCandidate, setPosition, setstep } from "./redux/actions/createVoteAction";

// check for voter
if (window.localStorage.voterJwtToken) {
  console.log("Voter already logedin");
  const decode = decodeToken(localStorage.voterJwtToken);
  const currentTime = Date.now() / 1000;

  if (decode.exp < currentTime) {
    store.dispatch(voterLogout());
    window.location.href = '/';
  }
  else {
    setAuthToken(localStorage.voterJwtToken);
    store.dispatch(setVoter(decode));
  }
}

// check for createVoteJwtToken
if (window.localStorage.createVoteJwtToken) {
  console.log("setting the createVOte details");
  const decode = decodeToken(localStorage.createVoteJwtToken);
  store.dispatch(setPosition(decode.position));
  store.dispatch(setstep(decode.step));
  store.dispatch(setCandidate(decode.candidate));
}

// check for admin
if (window.localStorage.adminJwtToken) {
  console.log("admin is already logged in");
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

// check for client
else if (window.localStorage.clientJwtToken) {
  console.log("client is already logged in")

  const decode = decodeToken(localStorage.clientJwtToken);
  const currentTime = Date.now() / 1000;

  if (decode.exp < currentTime) {
    store.dispatch(clientLogout());
    window.location.href = '/';
  }
  else {
    setAuthToken(localStorage.clientJwtToken);
    store.dispatch(setClient(decode));
  }
}

function App() {
  const store = useSelector((store) => store);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/adminLogin' element={<AdminLogin />} />
          <Route exact path='/admin' element={<AdminHome />} />
          <Route exact path='/adminSignup' element={<AdminSignup />} />
          <Route exact path='/clientLogin' element={<ClientLogin />} />
          <Route exact path='/clientSignup' element={<ClientSignup />} />
          <Route exact path='/client' element={<ClientHome />} />
          <Route exact path='/how' element={<How />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/createPoll' element={<CreatePoll />} />
          <Route exact path="/poll/:id" element={<Poll />} />
          <Route exact path="/pollResult/:id" element={<PollResult />} />
          <Route exact path="/polls" element={<OngoingPolls />} />
          <Route exact path="/dash" element={<ClientDashboard />} />
          <Route exact path="/createVote" element={<CreateVote />} />
          <Route exact path="/voterLogin" element={<VoterLogin />} />
          <Route exact path="/voterHome" element={<VoterHome />} />
          <Route exact path="/vote/:id" element={<Vote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;