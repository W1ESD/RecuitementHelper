import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import Settings from './Pages/Settings';
import CreateAccount from './Pages/CreateAccount';
import UploadList from "./Pages/UploadList";

const App: React.FC = () => {

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/uploadlist" element={<UploadList />} />
      </Routes>
    </div>
  )
}

export default App;