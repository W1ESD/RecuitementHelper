import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import NavBar from "./Components/NavBar";
import Settings from './Pages/Settings';

const App: React.FC = () => {

  // const showNavBar = () => {
  //   // Patterns for paths where NavBar should not be shown
  //   const excludePaths = [/^\/$/,];
  //   return !excludePaths.some(pattern => pattern.test(location.pathname));
  // };

  return (
    <div className="">
      {/* {showNavBar() && <NavBar />} */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default App;