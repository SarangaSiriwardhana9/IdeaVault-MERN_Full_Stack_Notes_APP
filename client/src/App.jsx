import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateNote from "./pages/CreateNote";
import MyNotes from "./pages/MyNotes";
import  Footer  from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      
      
        
        
       
        <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/createnote' element={<CreateNote />} />
              <Route path='/mynotes' element={<MyNotes />} />
            </Route>
            
          </Routes>
          <Footer />
          
      
      
    </BrowserRouter>
  );
}
