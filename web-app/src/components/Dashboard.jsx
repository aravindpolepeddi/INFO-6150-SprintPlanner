// Code for the main Dashboard Page after logging in
import React from 'react'
import SideBar from "../SideBar/SideBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskList from "../SideBar/TaskList/TaskList";
import Reports from "../SideBar/Reports/Reports";
import Board from "../SideBar/Board/Board";
import Project from "../SideBar/ProjectDetails/ProjectDetails";
import NavBarC from "../NavBar/NavBar";
import userApis from "../services/user-service";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      users: [],
    };
  }

  componentDidMount() {
    userApis
      .getAllUsers()
      .then((result) => result.json())
      .then((users) =>
        this.setState({ users }, () => {
          this.state.users.forEach((user) => {
            if (user.emailId === localStorage.getItem("emailId")) {
              let loggedUser = user;
              this.setState({ user: loggedUser });
            }
          });
        })
      );
  }

  
  render() {
    return (
      <div className="main">
        <NavBarC username={this.state.user.name}></NavBarC>
        <div className="sidebar-routes">
          {/* routes */}
          <Router>
            <SideBar />
            <Switch>
              <Route path="/tasks" exact component={TaskList} />
              <Route path="/board" exact component={Board} />
              <Route path="/reports" component={Reports} />
              <Route path="/project" component={Project} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default Dashboard;
