import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from './sign-in/[[...index]]';
import Signup from './sign-up/[[...index]]';
import DashboardLayout from "./pages/dashboard/layout";
import FilesPage from "./pages/dashboard/files";
import Starting from "./pages/dashboard/starting";
import FileDetailsPage from "./pages/download";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in/*" element={<Signin />} />
        <Route path="/sign-up/*" element={<Signup />} />
        <Route path="/download/:fileId" element={<FileDetailsPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Starting />} />
          <Route path="files" element={<FilesPage />} />
          <Route path="alerts" element={<Starting />} />
          <Route path="settings" element={<Starting />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
