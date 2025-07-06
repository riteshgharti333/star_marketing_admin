import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/Context";
import { useDarkMode } from "./Context/DarkModeContext";
import { Toaster } from "sonner";

import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import CompanyCards from "./pages/CompanyCards/CompanyCards";
import NewCompanyCard from "./pages/CompanyCards/NewCompanyCard";
import PartnerCards from "./pages/PartnerCards/PartnerCards";
import NewPartnerCards from "./pages/PartnerCards/NewPartnerCards";
import Review from "./pages/Review/Review";
import SingleReview from "./pages/Review/SingleReview";
import UpdateReview from "./pages/Review/UpdateReview";
import NewReview from "./pages/Review/NewReview";
import Project from "./pages/Project/Project";
import SingleProject from "./pages/Project/SingleProject";
import UpdateProject from "./pages/Project/UpdateProject";
import NewProject from "./pages/Project/NewProject";
import Contact from "./pages/Contact/Contact";
import SingleContact from "./pages/Contact/SingleContact";
import NewService from "./pages/Service/NewService";
import Service from "./pages/Service/Service";
import SingleService from "./pages/Service/SingleService";
import UpdateService from "./pages/Service/UpdateService";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

function App() {
  const { user } = useContext(Context);
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-[#f1f1f1] text-black"
      }`}
    >
      <BrowserRouter>
        {/* <BrowserRouter basename="/admin"> */}
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />

          <Route element={<Layout isDarkMode={isDarkMode} />}>
            <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
            <Route
              path="/profile"
              element={<Profile isDarkMode={isDarkMode} />}
            />

            {/* Company Cards */}
            <Route
              path="/company-cards"
              element={<CompanyCards isDarkMode={isDarkMode} />}
            />
            <Route
              path="/new-company-card"
              element={<NewCompanyCard isDarkMode={isDarkMode} />}
            />

            {/* Partner Cards */}
            <Route
              path="/partner-cards"
              element={<PartnerCards isDarkMode={isDarkMode} />}
            />
            <Route
              path="/new-partner-card"
              element={<NewPartnerCards isDarkMode={isDarkMode} />}
            />

            {/* Review */}
            <Route
              path="/review"
              element={<Review isDarkMode={isDarkMode} />}
            />
            <Route
              path="/review/:id"
              element={<SingleReview isDarkMode={isDarkMode} />}
            />
            <Route
              path="/update-review/:id"
              element={<UpdateReview isDarkMode={isDarkMode} />}
            />
            <Route
              path="/review/new-review"
              element={<NewReview isDarkMode={isDarkMode} />}
            />

            {/* Project */}
            <Route
              path="/project"
              element={<Project isDarkMode={isDarkMode} />}
            />
            <Route
              path="/project/:id"
              element={<SingleProject isDarkMode={isDarkMode} />}
            />
            <Route
              path="/update-project/:id"
              element={<UpdateProject isDarkMode={isDarkMode} />}
            />
            <Route
              path="/project/new-project"
              element={<NewProject isDarkMode={isDarkMode} />}
            />

            {/* Contacts */}
            <Route
              path="/contacts"
              element={<Contact isDarkMode={isDarkMode} />}
            />
            <Route
              path="/contact/:id"
              element={<SingleContact isDarkMode={isDarkMode} />}
            />

            {/* Service */}
            <Route
              path="/service"
              element={<Service isDarkMode={isDarkMode} />}
            />
            <Route
              path="/service/:id"
              element={<SingleService isDarkMode={isDarkMode} />}
            />
          </Route>

          {/* These are outside the Layout wrapper */}
          <Route
            path="/new-service"
            element={<NewService isDarkMode={isDarkMode} />}
          />
          <Route
            path="/update-service/:id"
            element={<UpdateService isDarkMode={isDarkMode} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
