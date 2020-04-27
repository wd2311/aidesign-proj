import React, { useState, useRef, useEffect } from "react";
import WelcomePage from "./welcome";
import TellUsPage from "./tell-us";
import ChooseMealsPage from "./choose";
import { ThemeProvider } from "styled-components";
import preset from "@rebass/preset";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Layout, Row, Button } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Navbar from "./components/Navbar.js";
import ReactDOM from "react-dom";
import "./pages/Page.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
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
        height: "100%",
        width: "100%",
        position: "absolute"
      }}
    >
      {props.children}
    </div>
  );
}

function useTransition(routes) {
  let history = useHistory();
  let [index, setIndex] = useState(getIndex() ?? 0);

  function getIndex() {
    const pathname = history.location?.pathname;
    if (pathname == null) {
      return null;
    }
    const index = routes.indexOf(pathname);
    return index !== -1 ? index : null;
  }

  function getNextRouteForID(id) {
    if (id > routes.length - 1) {
      return null;
    }
    return routes[id + 1];
  }

  function getPrevRouteForID(id) {
    if (id < 1) {
      return null;
    }
    return routes[id - 1];
  }

  return {
    forward: () => {
      const index = getIndex();
      const nextRoute = getNextRouteForID(index);
      if (nextRoute == null) {
        return;
      }

      history.push({
        pathname: nextRoute,
        state: { forward: true, index: index }
      });
      setIndex(index + 1);
    },
    backward: () => {
      const index = getIndex();
      const nextRoute = getPrevRouteForID(index);
      if (nextRoute == null) {
        return;
      }

      history.push({
        pathname: nextRoute,
        state: { forward: false, index: index }
      });

      setIndex(index - 1);
    },
    history: history,
    index: index
  };
}

function Content() {
  let { page } = useParams();
  let history = useHistory();

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
      <TransitionGroup
        childFactory={child => {
          const { pageNum } = child.props;
          return React.cloneElement(child, {
            classNames: pageNum < page ? "pageb" : "page"
          });
        }}
      >
        <CSSTransition key={1} pageNum={1}>
          <FullScreenWrapper>1</FullScreenWrapper>
        </CSSTransition>
        <CSSTransition
          key={2}
          in={ipage === 2}
          classNames="page"
          unmountOnExit
          timeout={3000}
        >
          <FullScreenWrapper>2</FullScreenWrapper>
        </CSSTransition>
        <CSSTransition
          key={3}
          in={ipage === 3}
          classNames="page"
          unmountOnExit
          timeout={3000}
        >
          <FullScreenWrapper>3</FullScreenWrapper>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function Cont() {
  let history = useHistory();
  let transition = useTransition([
    "/state-a",
    "/state-b",
    "/state-c",
    "/state-d"
  ]);
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup
          childFactory={child => {
            console.log("Make children");
            console.log(location);
            console.log(transition.history.location);
            console.log(transition.index);
            console.log(transition.history.action);
            const forward = location.state?.forward;
            return React.cloneElement(child, {
              classNames:
                transition.history.action === "PUSH" ? "page" : "pageb"
            });
          }}
        >
          <CSSTransition key={location.key} timeout={300}>
            <Switch location={location}>
              <Route exact path="/state-a" pageNum={0}>
                <FullScreenWrapper>
                  <button onClick={() => transition.forward()}>State A</button>
                </FullScreenWrapper>
              </Route>
              <Route exact path="/state-b" pageNum={1}>
                <FullScreenWrapper>
                  <button onClick={() => transition.forward()}>State B</button>
                </FullScreenWrapper>
              </Route>
              <Route exact path="/state-c" pageNum={2}>
                <FullScreenWrapper>
                  <button onClick={() => transition.forward()}>State C</button>
                </FullScreenWrapper>
              </Route>
              <Route exact path="/state-d" pageNum={3}>
                <FullScreenWrapper>
                  <button onClick={() => transition.forward()}>State D</button>
                </FullScreenWrapper>
              </Route>
              <Redirect from="/" to="/state-a" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

function App() {
  return (
    <Router>
      <Cont />
    </Router>
  );
}

export default App;
