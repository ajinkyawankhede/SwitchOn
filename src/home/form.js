import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Topbar from "./home";
import Select from "react-select";

// const department = [
//   { value: "Department1", label: "Department1" },
//   { value: "Department2", label: "Department2" },
// ];

const usersList = [];

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      department: "",
      user: "",
      message: "",
    };
  }

  getUsers() {
    let token = localStorage.getItem("userToken");
    let id = localStorage.getItem("email");
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      url: `http://localhost:8800/api/getUsersList`,
    }).then((response) => {
      this.setState({ email: id, department: response.data.dept });
      for (var i in response.data.d) {
        usersList.push({
          label: response.data.d[i].email,
          value: response.data.d[i].email,
        });
      }
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  submitQuery = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("userToken");
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      url: `http://localhost:8800/api/submitForm`,
      data: {
        assignedTo: this.state.user,
        message: this.state.message,
        department: this.state.department,
      },
    }).then((response) => {
      if (response.data.s) {
        alert(response.data.m);
        window.location = "/form";
      } else {
        alert("Something went wrong");
      }
    });
  };

  handleUsers = (e) => {

    var options = e;
    var value = "";
    if (options !== null) {
      value = e.label;

      this.setState({ user: value });
    }
  };

  handleMessage = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <section>
          <Topbar active={"Form"} />
        </section>
        <section className="newform">
          <div className="container-fluid">
            <div className="box">
              <h3
                style={{
                  textAlignLast: "center",
                  background: "silver",
                  fontFamily: "monospace",
                }}
              >
                QUERY FORM
              </h3>
              <div className="row">
                <div className="col-md-12">
                  <form className="form-horizontal">
                    <div className="form-group">
                      <label className="col-sm-3 control-label">
                        Created By{" "}
                      </label>
                      <div className="col-sm-9">
                        <input
                          // maxLength="20"
                          type="text"
                          className="form-control"
                          name="title"
                          placeholder="Created By"
                          //   onChange={this.handleScriptInputTitle}
                          required={true}
                          value={this.state.email}
                        />
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-sm-3 control-label">
                        Department to Assign
                      </label>
                      <div class="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="department"
                          placeholder="Department"
                          required={true}
                          value={this.state.department}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">Users</label>
                      <div class="col-sm-9">
                        <Select
                          onChange={this.handleUsers}
                          options={usersList}
                          placeholder="Users"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-sm-3 control-label">Message</label>
                      <div className="col-sm-9">
                        <textarea
                          className="form-control"
                          rows="10"
                          name="message"
                          onChange={this.handleMessage}
                          value={this.state.message}
                          placeholder="Message"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                  <button
                    onClick={this.submitQuery}
                    type="submit"
                    className="btn btn-success btn-shadow btn-md"
                    style={{ marginRight: "390px", float: "right" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Form;
