import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useParams,
  useHistory
} from "react-router-dom";

function Page(props) {
  const { children, id, route, transition } = props;
  return (
    <Route exact path={route}>
      {children.map(child =>
        React.cloneElement(child, {
          onForward: transition.forward(id),
          onBackward: transition.backward(id)
        })
      )}
    </Route>
  );
}

export default Page;
