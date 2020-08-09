import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import "./home.css";

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: "",
      pending: "",
      approved: "",
    };
    this.socket = io(
      `http://localhost:8800`,
      {
        query: {
          orderType: "FORM",
        },
      },
      { transports: ["websocket"] }
    );
    this.socket.on("approvalNotfication", (user) => {
      var _id = localStorage.getItem("_id");
      if (user.user === _id) {
      }

      this.countNotifications();
    });
    this.socket.on("acceptedNotification", (user) => {
      var _id = localStorage.getItem("_id");
      if (user.user === _id) {
      }

      this.countNotifications();
    });
    this.socket.on("rejectedNotification", (user) => {
      var _id = localStorage.getItem("_id");
      if (user.user === _id) {
      }

      this.countNotifications();
    });
  }

  countNotifications() {
    let token = localStorage.getItem("userToken");
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      url: `http://localhost:8800/api/notificationsCount`,
    }).then((response) => {
      if (response.data.s) {
        this.setState({ countNotification: response.data.d });
      }
    });
  }

  componentDidMount() {
    this.countNotifications();
  }

  markAsRead() {
    let token = localStorage.getItem("userToken");
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      url: `http://localhost:8800/api/markAsRead`,
    }).then((response) => {
      console.log(response);
      if (response.data.s) {
        window.location = "/notifications";
      }
    });
  }

  componentWillMount() {
    if (this.props.active === "form") {
      this.setState({
        form: "active",
        pending: "",
        approved: "",
      });
    }
    if (this.props.active === "pending") {
      this.setState({
        form: "",
        pending: "active",
        approved: "",
      });
    }
    if (this.props.active === "approved") {
      this.setState({
        form: "",
        pending: "",
        approved: "active",
      });
    }
  }

  handleLogOut = (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location = "/login";
  };

  render() {
    return (
      <div className="wrapper">
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <a
                href="/form"
                className={this.state.form}
                style={{ marginRight: "20px" }}
              >
                Form
              </a>
            </li>
            <li className="nav-item ">
              <a
                href="/pending"
                className={this.state.pending}
                style={{ marginRight: "20px" }}
              >
                {" "}
                Pending
              </a>
            </li>
            <li className="nav-item ">
              <a
                href="/approved"
                className={this.state.approved}
                style={{ marginRight: "20px" }}
              >
                Approved
              </a>
            </li>
            <li className="nav-item ">
              <a href="/rejected" className={this.state.rejected}>
                Rejected
              </a>
            </li>
            <li>
              <Link onClick={this.markAsRead}>
                <i
                  className="fa fa-bell"
                  style={{
                    fontSize: "24px",
                    marginLeft: "1075px",
                    // marginRight: "20px",
                  }}
                ></i>
                <span style={{ top: "1px", position: "absolute" }}>
                  {this.state.countNotification}
                </span>
              </Link>
            </li>
          </ul>

          <div class="logout" style={{ marginLeft: "20px" }}>
            <button
              onClick={this.handleLogOut}
              // style={{ marginLeft: "px" }}
              class="btn btn-primary btn-shadow"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Topbar;
