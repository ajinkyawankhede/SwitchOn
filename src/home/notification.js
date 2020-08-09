import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Topbar from "./home";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      notifications: [],
    };
  }

  getNotifications() {
    let token = localStorage.getItem("userToken");
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      url: `http://localhost:8800/api/notifications`,
    }).then((response) => {
      if (response.data.s) {
        console.log(response);
        this.setState({ notifications: response.data.d });
      }
    });
  }

  componentDidMount() {
    this.getNotifications();
  }
  render() {
    return (
      <div>
        <section>
          <Topbar active={"Approved"} />
        </section>

        <section className="request-access margin-top-30">
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
                    Notifications
                  </h3>
                  <table className="table custom-table">
                    <tbody>
                      {this.state.notifications.map((notification, i) => {
                        console.log(notification);
                        return (
                          <tr>
                            <td>{notification.message}</td>
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

export default Notification;
