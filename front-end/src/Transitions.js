import React, { useState } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
  useHistory
} from "react-router-dom";

function Transitions(props) {
  const {
    location,
    children,
    routes,
    history,
    forwardClass,
    backwardClass,
    defaultId = 0
  } = props;

  function getRouteForID(id) {
    return routes[id];
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

  function forward(index) {
    history.push({
      pathname: getNextRouteForID(index),
      state: { forward: true }
    });
  }

  function backward(index) {
    history.push({
      pathname: getPrevRouteForID(index),
      state: { forward: false }
    });
  }

  console.log(children);

  return (
    <TransitionGroup
      childFactory={child => {
        const idx = location.state?.index;
        const idx = location.state?.index;
        return React.cloneElement(child, {
          classNames: forward ? forwardClass : backwardClass
        });
      }}
    >
      <CSSTransition key={location.key}>
        <Switch location={location}>
          {React.Children.map(children, (child, index) => (
            <Route exact path={getRouteForID(index)}>
              {React.cloneElement(child, {
                onForward: () => forward(index),
                onBackward: () => backward(index)
              })}
            </Route>
          ))}
          <Redirect from="/" to={getRouteForID(defaultId)} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default Transitions;
