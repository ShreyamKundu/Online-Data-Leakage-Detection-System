import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from './sign-in/[[...index]]';
import Signup from './sign-up/[[...index]]';
import DashboardLayout from "./pages/dashboard/layout";
import FilesPage from "./pages/dashboard/files";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in/*" element={<Signin />} />
        <Route path="/sign-up/*" element={<Signup />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
        <Route path="/dashboard/files*" element={<FilesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
