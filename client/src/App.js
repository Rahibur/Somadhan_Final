// App.js is responsible for routing all the pages
import './App.css';//Routing css file
import './index.css';//Routing css file
import "./responsive.css";
//Routing Navbar file, Home file, Register + Edit file,details file

import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import UserRegister from './components/UserRegister';
import Starter from './components/Starter';
import Connect from './components/Connect';
import { Route, Routes,Navigate } from "react-router-dom"//Defining Route and Routes react components
import Login from './components/Login';
import Details_Two from './components/Details_Two';
import Details_Three from './components/Details_Three';
import Generate from './components/Generate';
import Plans from './components/Plans'
import Yearly_goal from './components/Yearly_goal'
import Daily_task from './components/Daily_task'
import Monthly_goal from './components/Monthly_goal';
import Notes from './components/Notes';
import Renter_details from './components/Renter_details';
import Management from './components/Management';
import About from './components/About';
import Checkout from './components/Checkout';
import Checkout_2 from './components/Checkout_2';
import Admin from './components/Admin';
import Checkout_3 from './components/Checkout_3';


function App() {


  return (
    //Defining navbar and Routes
    <>

    
      <Routes>
        <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>}/>
        <Route exact path="/starter" element={<Starter />} />
        <Route  path="/connect" element={<Connect />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        <Route exact path="/view/:id" element={<Details />} />
        <Route exact path="/view_1/:id" element={<Details_Two />} />
        <Route exact path="/view_2/:id" element={<Details_Three />} />
         <Route path='/reguser' element={<UserRegister/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/generate' element={<Generate/>}/>
         <Route path='/plans' element={<Plans/>}/>
         <Route path='/yearly' element={<Yearly_goal/>}/>
         <Route path='/daily' element={<Daily_task/>}/>
         <Route path='/monthly' element={<Monthly_goal/>}/>
         <Route path='/note' element={<Notes />}/>
         <Route path='/renter' element={<Renter_details />}/>
         <Route path='/management' element={<Management />}/>
         <Route path='/about' element={<About />}/>
         <Route path="/checkout/:id" element={<Checkout />} />
         <Route path="/checkout_2/:goalType" element={<Checkout_2 />} />
         <Route path="/checkout_3/:sectionType" element={<Checkout_3 />} />
         <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
  
}
export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children
  }else{
    return <Navigate to ="/login" />;
  }
}
export default App;