import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./login/login";
import Register from "./register/register";
import PrivateRoute from "./privateRoute/userRoute";
import Topbar from "./home/home";
import Form from "./home/form";
import Pending from "./home/pending";
import Approved from "./home/approved";
import Rejected from "./home/rejected";
import Notification from "./home/notification";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Topbar} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/pending" component={Pending} />
        <Route exact path="/approved" component={Approved} />
        <Route exact path="/rejected" component={Rejected} />
        <Route exact path="/notifications" component={Notification} />
      </Switch>
    </Router>
  );
}

export default App;
