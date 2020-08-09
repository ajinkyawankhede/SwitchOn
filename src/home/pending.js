import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Topbar from "./home";

class Pending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pendingList: [],
    };
  }

  getPending() {
    let token = localStorage.getItem("userToken");
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      url: `http://localhost:8800/api/pendingForms`,
    }).then((response) => {
      if (response.data.s) {
        this.setState({ pendingList: response.data.d });
      } else {
        alert("Something went wrong");
      }
    });
  }

  componentDidMount() {
    this.getPending();
  }

  approveRequest = (e, id) => {
    let token = localStorage.getItem("userToken");
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: { id: id },
      url: `http://localhost:8800/api/acceptRequest`,
    }).then((response) => {
      if (response.data.s) {
        alert(response.data.m);
        window.location = "/pending";
      } else {
        alert("Something Went Wrong");
      }
    });
  };

  rejectRequest = (e, id) => {
    let token = localStorage.getItem("userToken");
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: { id: id },
      url: `http://localhost:8800/api/rejectRequest`,
    }).then((response) => {
      if (response.data.s) {
        alert(response.data.m);
        window.location = "/pending";
      } else {
        alert("Something Went Wrong");
      }
    });
  };

  render() {
    return (
      <div>
        <section>
          <Topbar active={"Pending"} />
        </section>
        <section className="request-access margin-top-30" id="pendingForms">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="box request-access-list">
                  <h3
                    style={{
                      textAlignLast: "center",
                      background: "silver",
                      fontFamily: "monospace",
                    }}
                  >
                    PENDING REQUESTS
                  </h3>
                  <table className="table custom-table">
                    <thead>
                      <tr>
                        <th>Request From</th>
                        <th>Assigned To</th>
                        <th>Message</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.pendingList.map((form, i) => {
                        return (
                          <tr className="tr-shadow">
                            <td>{form.createdBy}</td>
                            <td>{form.assignedTo}</td>
                            <td>{form.message}</td>
                            <td>
                              {form.assignedTo ===
                              localStorage.getItem("email") ? (
                                <button
                                  className="btn btn-success btn-shadow"
                                  style={{ width: "100px" }}
                                  data-toggle="modal"
                                  data-target="#hold"
                                  onClick={(e) => {
                                    const id = form._id;
                                    this.approveRequest(e, id);
                                  }}
                                >
                                  Approve
                                </button>
                              ) : null}
                              {form.assignedTo ===
                              localStorage.getItem("email") ? (
                                <button
                                  className="btn btn-danger btn-shadow"
                                  style={{ width: "100px", marginLeft: "5px" }}
                                  data-toggle="modal"
                                  data-target="#hold"
                                  onClick={(e) => {
                                    const id = form._id;
                                    this.rejectRequest(e, id);
                                  }}
                                >
                                  Reject
                                </button>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Pending;
