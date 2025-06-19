import { Outlet } from "react-router-dom";
import Header from "./components/pages/Header";
import Home from "./components/pages/Home";
import Footer from "./components/pages/Footer";
import InfoContextProvider from "./components/context/InfoContextProvider";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <InfoContextProvider>
      {/*  <Header /> */}
      <Outlet />
      {/* <Footer /> */}
      {/* <ToastifyNotifications /> */}
    </InfoContextProvider>
  );
}

export default App;
