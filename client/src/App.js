import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateOutlet from './components/PrivateOutlet/PrivateOutlet';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import {UserContextProvider} from "./UserContext";
import Add from './components/Add/Add';
import Home from './components/Home/Home';
import Update from './components/Update/Update';
function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
    <div className="App">
    <Navbar />
    <Routes>
    <Route element = {<PrivateOutlet/>}>
      <Route path = "/" element = {<Home />} />
      <Route path = "/add" element = {<Add />} />
      <Route path = "/update/:id" element = {<Update />} />
      <Route path = "/profile" element = {<h3> profile</h3>} />
    </Route>
    <Route path = "/signup" element = {<Signup />} />
    <Route path = "/login" element = {<Login />} />
    </Routes>
    <Footer />
    </div>
    </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
