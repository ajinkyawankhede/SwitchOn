import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleLogin = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmitLoginForm = (event) => {
    event.preventDefault();

    axios({
      method: "POST",
      url: `http://localhost:8800/api/login`,
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    })
      .then(function (response) {
        if (response.data.s) {
          localStorage.setItem("userToken", response.data.usertoken);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("_id", response.data._id);
          alert(response.data.m);
          window.location = "/form";
        } else {
          alert(response.data.m);
        }
      })
      .catch((error) => {
        console.log("========", error);
      });
  };
  render() {
    return (
      <div className="signup-content">
        <div className="row">
          <div
            className="col-md-3"
            style={{ marginTop: "200px", marginLeft: "550px" }}
          >
            <div className="signup-form" style={{ marginLeft: "20px" }}>
              <h2>Log In </h2>
              <form onSubmit={this.handleSubmitLoginForm}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control input"
                    placeholder="Email ID"
                    name="email"
                    onChange={this.handleLogin}
                  />
                  <span className="focus-input" placeholder="Email ID"></span>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control input"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleLogin}
                  />
                  <span className="focus-input" placeholder="Password"></span>
                </div>

                <div className="form-group">
                  <label className="remember-checkbox">
                    <input type="checkbox" className="custom-checkbox" />
                    <span style={{ marginLeft: "5px" }}>Remember me</span>
                  </label>
                </div>

                <div className="form-group margin-top-30">
                  <button
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    Log In
                  </button>
                  {/* <button type="submit" className="btn btn-success btn-shadow btn-lg">Log in</button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
