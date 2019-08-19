import React from "react";
import { Route } from "react-router-dom";
import TopBar from "../../components/TopBar";
import Mission from "../mission/index.jsx";
const MainPage = ({ match }) => (
  <div>
    <TopBar />
    <Route path={`${match.path}/mission`} component={Mission} />
    <Route path="" />
    <Route path="" />
    <Route path="" />
    <Route path="" />
  </div>
);

export default MainPage;
