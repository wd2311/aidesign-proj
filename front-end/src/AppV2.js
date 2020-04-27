import React, { useState, useRef, useEffect } from "react";
import WelcomePage from "./pages/WelcomePage.js";
import TellUsPage from "./pages/TellUsPage.js";
import ChooseMealsPage from "./choose/ChooseMealsPage.js";
import SummaryPage from "./summary/SummaryPage.js";
import { ThemeProvider } from "styled-components";
import preset from "@rebass/preset";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Layout, Row, Button } from "antd";
import { CSSTransition } from "react-transition-group";
import Navbar from "./components/Navbar.js";
import ReactDOM from "react-dom";
import "./pages/Page.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
  useHistory
} from "react-router-dom";

import "antd/dist/antd.css";
const theme = {
  ...preset
};

function FullScreenWrapper(props) {
  return (
    <div
      style={{
        display: "inline-block",
        height: "calc(100vh - 52px)",
        top: "52px",
        width: "100%",
        position: "absolute"
      }}
    >
      {props.children}
    </div>
  );
}

function Content() {
  let { page } = useParams();
  let history = useHistory();
  const [mealPlan, setMealPlan] = useState([]);
  const [allergys, setAllergys] = useState([]);
  const [pantry, setPantry] = useState([]);
  useEffect(() => {
    console.log("Mount" + page === 1);
  });
  console.log(page);
  let ipage = parseInt(page);
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "auto",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Navbar />
      <CSSTransition
        in={ipage === 1}
        classNames="page"
        unmountOnExit
        timeout={3000}
      >
        <FullScreenWrapper>
          <WelcomePage
            onClicked={() => {
              history.push(`/${ipage + 1}`);
            }}
          />
        </FullScreenWrapper>
      </CSSTransition>
      <CSSTransition
        in={ipage === 2}
        classNames="page"
        unmountOnExit
        timeout={3000}
      >
        <FullScreenWrapper>
          <TellUsPage
            onClicked={(a, p) => {
              setAllergys(a);
              setPantry(p);
              history.push(`/${ipage + 1}`);
            }}
          />
        </FullScreenWrapper>
      </CSSTransition>
      <CSSTransition
        in={ipage === 3}
        classNames="page"
        unmountOnExit
        timeout={3000}
      >
        <FullScreenWrapper>
          <ChooseMealsPage
            pantry={pantry}
            allergys={allergys}
            mealPlan={mealPlan}
            onClicked={mealPlan => {
              setMealPlan(mealPlan);
              history.push(`/${ipage + 1}`);
            }}
          />
        </FullScreenWrapper>
      </CSSTransition>
      <CSSTransition
        in={ipage === 4}
        classNames="page"
        unmountOnExit
        timeout={3000}
      >
        <FullScreenWrapper>
          <SummaryPage
            mealPlan={mealPlan}
            onClicked={() => {
              history.push(`/${ipage + 1}`);
            }}
          />
        </FullScreenWrapper>
      </CSSTransition>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:page">
          <Content />
        </Route>
        <Redirect from="/" to="/1" />
      </Switch>
    </Router>
  );
}

export default App;
