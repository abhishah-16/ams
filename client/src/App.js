import react from 'react'
import './App.css';
import {  Route, useHistory, Routes, BrowserRouter } from "react-router-dom";
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import SignUp from './components/screens/Signup';
import ManagerSignup from './components/screens/ManagerSignup';
import OrganizerSignup from './components/screens/OrganizerSignup';
import CustomerSignup from './components/screens/CustomerSignup';


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
      <Login/>
    </Route>
    <Route exact path='/signup'>
      <SignUp/>
    </Route>
    <Route exact path='/customer/signup'>
      <CustomerSignup/>
    </Route>
    <Route exact path='/manager/signup'>
      <ManagerSignup/>
    </Route>
    <Route exact path='/organizer/signup'>
      <OrganizerSignup/>
    </Route>
    </BrowserRouter>
    
    
  );
}
export default App;

