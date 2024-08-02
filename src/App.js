import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Course from "./scenes/Courses";
import CourseUpdate from "./scenes/Courses/CourseUpdate";
import CreateCourse from "./scenes/Courses/CreateCourse";
import Invoices from "./scenes/ManageCategories";
import Contacts from "./scenes/students";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Donut from "./scenes/donut";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import DesignFile from "./FrontendComponents/DesignFile";
// import Register from "./User/Signup/Register";
import Signup from "./Instructor/Signup";
import Login from "./Instructor/Login";
import UpdateProfile from "./Instructor/UpdateProfile";
import Allsubcategories from "./scenes/ManageCategories/Subcategories/Allsubcategories";
import Allprogramminglang from "./scenes/ManageCategories/ProgrammingLanguages/Allprogramminglang";
import Allcontentvideoes from "./scenes/ManageCategories/ContentVideos/Allcontentvideoes";
import Allchapteres from "./scenes/ManageCategories/Chapters/Allchapteres";
import Allcontent from "./scenes/ManageCategories/Contents/Allcontent";
import AllContentFiles from "./scenes/ManageCategories/ContentFiles/AllContentFiles";
import SignupPage from "./User/Test/SignupPage";
import Logout from "./Instructor/Logout";
import axios from "axios";
import Loading from "./scenes/global/Loading";
import { useEffect } from "react";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [theme, colorMode] = useMode();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    //Response Interceptor
    axios.interceptors.response.use(
      (config) => {
        // setTimeout(() => {
        setLoading(false);
        // }, 1000);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Loading show={loading} />
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/fb" element={<DesignFile />} />

          <Route
            path="/db"
            element={
              <PrivateRoute>
                {" "}
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/profileupdate" element={<UpdateProfile />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/courseupdates" element={<CourseUpdate />} />
          <Route path="/addnewcourse" element={<CreateCourse />} />
          <Route path="/students" element={<Contacts />} />
          <Route path="/managecategories" element={<Invoices />} />
          <Route
            path="/manageallsubcategories"
            element={<Allsubcategories />}
          />
          <Route
            path="/manageallprogramminglanguages"
            element={<Allprogramminglang />}
          />
          <Route path="/manageallchapters" element={<Allchapteres />} />
          <Route
            path="/manageallcontentvideos"
            element={<Allcontentvideoes />}
          />
          <Route path="/manageallcontents" element={<Allcontent />} />
          <Route path="/manageallcontentfiles" element={<AllContentFiles />} />
          <Route path="/form" element={<Form />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/donut" element={<Donut />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/geography" element={<Geography />} />
        </Routes>

        {/* <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} /> */}
        {/* <Routes>
                  </Routes> */}
        {/* </main>
            </div> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
