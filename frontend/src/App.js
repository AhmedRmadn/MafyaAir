import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import clientFlight from "./components/clientFlight/clientFlight"
import bookFlight from "./components/bookFlight/bookFlight"
import showFlights from "./components/showFlight/showFlight"
import createFlight from "./components/createFlight/createFlight"
import InquiryScreen from "./screens/InquiryScreen/InquiryScreen"
import updateFlight from "./components/updateFlight/updateFlight"
import profile from "./components/editProfile/editProfile"
import InquiryFlights from "./components/InquiryFlights/clientFlight"
import AdminScreen from "./screens/AdminScreen/AdminScreen"
import myFlights from "./components/myFlights/myFlights"
import { useState } from "react";
import Button from '@mui/material/Button';
import test from "./components/test"
function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">

    
        <Route path="/homepage" component={LandingPage} exact />
        <Route path="/" component={LandingPage} exact />



        <Route path="/myflights" component={myFlights}  />
        <Route path="/createFlight" component={createFlight}  />
        <Route path='/updateFlight/:id' component={updateFlight } />
        <Route path='/showFlights' component={showFlights} />
        
        <Route path='/adminSearch' component={AdminScreen} />
        
        <Route path="/profile" component={profile} />
        <Route path="/book" component={bookFlight} />
        <Route path="/show" component={clientFlight} />
        <Route path="/search" component={SearchScreen}  />
        <Route path="/Inquiry" component={InquiryScreen}  />
        <Route path="/showInquiry" component={InquiryFlights}  />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
      </main>
    </Router>
  );
}

export default App;
