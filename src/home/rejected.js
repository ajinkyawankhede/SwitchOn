import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Topbar from "./home";

class Rejected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rejectedList: [],
    };
  }
  getRejected() {
    let token = localStorage.getItem("userToken");
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      url: `http://localhost:8800/api/rejectedForms`,
    }).then((response) => {
      if (response.data.s) {
        this.setState({ rejectedList: response.data.d });
      } else {
        alert("Something went wrong");
      }
    });
  }

  componentDidMount() {
    this.getRejected();
  }

  render() {
    return (
      <div>
        <section>
          <Topbar active={"Rejected"} />
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
                    REJECTED REQUESTS
                  </h3>

                  <table className="table custom-table">
                    <thead>
                      <tr>
                        <th>Request From</th>
                        <th>Assigned To</th>
                        <th>Message</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.rejectedList.map((form, i) => {
                        return (
                          <tr className="tr-shadow">
                            <td>{form.createdBy}</td>
                            <td>{form.assignedTo}</td>
                            <td>{form.message}</td>
                            <td>Rejected</td>
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

export default Rejected;
