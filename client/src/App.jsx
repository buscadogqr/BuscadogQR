import { Route, Routes } from "react-router-dom";

//  <----- Components ----->
import { NavBar } from "./components/NavBar/NavBar.jsx";
import { Footer } from "./components/Footer/Footer.jsx"

//  <----- Pages ----->
import { Home } from "./pages/Home/Home.jsx";
import { About } from "./pages/About/About.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { Register } from "./pages/Register/Register.jsx";
import { Contact } from "./pages/Contact/Contact.jsx";
import { Error } from "./pages/Error/Error.jsx";
import { Profile } from "./pages/Profile/Profile.jsx";
import { EditProfile } from "./pages/Profile/EditProfile.jsx";
import { Pets } from "./pages/Pets/Pets.jsx";
import { PetDetails } from "./pages/Pets/PetDetails.jsx";
import { EditPetDetails } from "./pages/Pets/EditPetDetails.jsx";
import { Subscribe } from "./pages/Subscribe/Subscribe.jsx";
import { AddPet } from "./pages/Pets/AddPet.jsx";
import { Admin } from "./pages/Admin/Admin.jsx";
import { OurStories } from "./pages/OurStories/OurStories.jsx";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword.jsx";
import { ResetPassword } from "./pages/ForgotPassword/ResetPassword.jsx";
import { AddMore } from "./pages/Subscribe/AddMore.jsx";
import { ExtendMembership } from "./pages/Pets/ExtendMembership.jsx";

const AppRouter = () => {
  return (
    <>
        <NavBar />
        
        <Routes>

          <Route
          path="*"
          element={<Error/>}
          />

          <Route 
          path= "/home"
          element={<Home/>} 
          />

          <Route 
          path= "/about"
          element={<About/>}
          />

          <Route 
          path="/login"
          element={<Login/>}
          />

          <Route 
          path="/register"
          element={<Register/>}
          />

          <Route
          path="/contact"
          element={<Contact/>}
          />
          
          <Route
          path="/profile"
          element={<Profile/>}
          />

          <Route
          path="/editProfile"
          element={<EditProfile/>}
          />

          <Route
          path="/pets"
          element={<Pets/>}
          />

          <Route
          path='/pet/:id'
          element={<PetDetails/>} 
          />

          <Route
          path="/editPetInfo/:id"
          element={<EditPetDetails/>}
          />

          <Route
          path="/subscribe"
          element={<Subscribe/>}
          />

          <Route
          path="/addPet"
          element={<AddPet/>}
          />

          <Route
          path="/admin"
          element={<Admin/>}
          />

          <Route
          path="/ourStories"
          element={<OurStories/>}
          />

          <Route
          path="/forgotPass"
          element={<ForgotPassword/>}
          />

          <Route
          path="resetPass"
          element={<ResetPassword/>}
          />

          {/* <Route
          path="addMore"
          element={<AddMore/>}
          />

          <Route
          path="extendMembership/:months"
          element={<ExtendMembership/>}
          /> */}

        </Routes>

        <Footer />
    </>
  );
};

export default AppRouter;
