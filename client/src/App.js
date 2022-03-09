import react from 'react'
import './App.css';
import {  Route, useHistory, Routes, BrowserRouter } from "react-router-dom";
import Home from './components/screens/Home';
import UserLogin from './components/screens/UserLogin';
import UserSignup from './components/screens/UserSignup';
import NavBar from './components/Navbar';
import Footer from './components/Footer';


// const Routing = () => {
//   return(
//     <BrowserRouter>
//     <Routes>
//     <Route exact path="/">
//       <Home />
//     </Route>
//     <Route exact path="/UserSignup">
//       <UserSignup />
//     </Route>
//     <Route exact path="/userlogin">
//       <UserLogin />
//     </Route>
//     </Routes> 
//     </BrowserRouter>
//   )
// }


function App() {

  
  return (
    <BrowserRouter>
    
    

    <Route exact path='/'>
      <Home/>
    </Route>
    <Route exact path='/login'>
      <UserLogin/>
    </Route>
    <Route exact path='/signup'>
      <UserSignup/>
    </Route>
    </BrowserRouter>
    
    
  );
}
export default App;

