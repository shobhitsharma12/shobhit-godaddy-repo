import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RepoDetailPage from "./pages/RepoDetailPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo/:repoName" element={<RepoDetailPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
