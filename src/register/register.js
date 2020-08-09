import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

const department = [
  { value: "Department1", label: "Department1" },
  { value: "Department2", label: "Department2" },
];
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      department: "",
    };
  }

  handleEmail = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      emailInput: null,
    });
    if (event.target.value === "") {
      this.setState({
        email: "focus-input",
      });
    }
  };

  handlePasssword = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      passwordInput: null,
    });
    if (event.target.value === "") {
      this.setState({
        password: "focus-input",
      });
    }
  };

  handleDepartment = (e) => {
    var options = e;
    var value = options.label;

    // if (options !== null) {
    //   for (var i = 0, l = options.length; i < l; i++) {
    //     value.push(e.label);
    //   }
    this.setState({ department: value });
    // }
  };

  handleSubmitSignUpForm = (event) => {
    event.preventDefault();

    if (
      this.state.password === null ||
      this.state.password === "" ||
      this.state.password === undefined ||
      this.state.email === null ||
      this.state.email === "" ||
      this.state.email === undefined ||
      this.state.department.length == 0
    ) {
      alert("Please Provide All Information");
      return false;
    }

    axios({
      method: "POST",
      url: `http://localhost:8800/api/signUp`,
      data: {
        email: this.state.email,
        password: this.state.password,
        department: this.state.department,
      },
    }).then(function (response) {
      if (response.data.s) {
        alert(response.data.m);
        window.location = "/login";
      } else {
        alert(response.data.m);
      }
    });
  };

  render() {
    return (
      <div className="signup-content">
        <div className="row">
          <div
            className="col-md-3"
            style={{ marginLeft: "550px", marginTop: "145px" }}
          >
            <div className="signup-form" style={{ marginLeft: "20px" }}>
              <h2>Sign up</h2>
              <form onSubmit={this.handleSubmitSignUpForm}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control input"
                    name="email"
                    placeholder="Email ID"
                    onChange={this.handleEmail}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control input"
                    name="password"
                    placeholder="Password"
                    onChange={this.handlePasssword}
                  />
                </div>
                <div className="form-group">
                  <Select
                    onChange={this.handleDepartment}
                    options={department}
                    placeholder="Department"
                  />
                </div>
                <div className="form-group margin-top-30">
                  <button
                    type="submit"
                    // onClick={this.handleSubmitSignUpForm}
                    className="btn btn-success btn-shadow btn-md"
                    style={{ float: "right" }}
                  >
                    Create Account
                  </button>
                  <p className="login-link">
                    Already signed up? <Link to="/login">Log in</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
