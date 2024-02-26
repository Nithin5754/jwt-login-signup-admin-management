import { Outlet } from "react-router-dom";
import { NavBar } from "./components/index";

function App() {


  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}

export default App
