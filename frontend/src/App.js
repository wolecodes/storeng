// import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import apiSummary from "./common/index";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
function App() {
  const disPatch = useDispatch();
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(apiSummary.current_user.url, {
      method: apiSummary.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      disPatch(setUserDetails(dataApi.data));
    }

    console.log("data-user", dataResponse);
  };
  useEffect(() => {
    /** user details */
    fetchUserDetails();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user details fetch
        }}
      >
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
