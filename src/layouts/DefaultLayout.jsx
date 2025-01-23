import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import Footer from "../components/layout/Footer";

export default function DefaultLayout() {
  return (
    <>
      <div className="wrapper">
        <Header></Header>
        <div className="flex-grow-1">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
