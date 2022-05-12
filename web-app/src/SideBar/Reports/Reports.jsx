// Logic for the Report
import React from "react";
import Plot from "react-plotly.js";
import "./Reports.scss";
import sprintApis from "../../services/sprint-service";
import ticketApis from "../../services/tickets-service";

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprints: [],
      selectedSprint: [],
      allTickets: [],
      rowData: [],
      selectedSprintName: "",
      pieChartData: [],
      pieChartLayout: {
        height: 400,
        width: 500,
        title: "Report of the selected sprint",
      },
      barChartData: [],
      barChartLayout: {
        height: 400,
        width: 500,
        title: "Tickets assigned to each developer",
      },
    };
  }

  componentDidMount() {
    // Get all the sprint APIS
    sprintApis
      .getAllSprints()
      .then((result) => result.json())
      .then((sprints) =>
        this.setState(
          {
            sprints,
            selectedSprint: sprints[0],
            selectedSprintName: sprints[0].sprintName,
          },
          () => {
            // Get all the tickets
            ticketApis
              .getAllTickets()
              .then((result) => result.json())
              .then((res) => {
                this.setState({ allTickets: res });
                let filteredSprintTickets = [];
                res.forEach((element) => {
                  if (
                    element.sprint[0] === this.state.selectedSprint.sprintName
                  ) {
                    filteredSprintTickets.push(element);
                  }
                });
                // set state of the data to be shown
                this.setState({ rowData: filteredSprintTickets }, () => {
                  // get all tickets in done state
                  let done = [];
                  this.state.rowData.forEach((element) => {
                    if (
                      JSON.stringify(element.status) ===
                      JSON.stringify(["Done"])
                    ) {
                      done.push(element);
                    }
                  });
                  // get all tickets in in progress state
                  let inprogress = [];
                  this.state.rowData.forEach((element) => {
                    if (
                      JSON.stringify(element.status) ===
                      JSON.stringify(["In progress"])
                    ) {
                      inprogress.push(element);
                    }
                  });
                  // get all tickets in open state
                  let open = [];
                  this.state.rowData.forEach((element) => {
                    if (
                      JSON.stringify(element.status) ===
                      JSON.stringify(["Open"])
                    ) {
                      open.push(element);
                    }
                  });
                  // set the pie chart data
                  this.setState({
                    pieChartData: [
                      {
                        values: [inprogress.length, open.length, done.length],
                        labels: ["In progress", "Open", "Done"],
                        type: "pie",
                      },
                    ],
                  });
                  let users = [];
                  let uniqueUsers = [];
                  let ticketsAssigned = [];
                  let ticketCount = [];
                  this.state.rowData.forEach((element) => {
                    users.push(element.assignedTo);
                  });
                  // get all unique users
                  uniqueUsers = Array.from(new Set(users));
                  uniqueUsers.forEach((user) => {
                    ticketsAssigned = [];
                    this.state.rowData.forEach((element) => {
                      if (user === element.assignedTo) {
                        ticketsAssigned.push(element);
                      }
                    });
                    // get the unique user ticket count
                    ticketCount.push(ticketsAssigned.length);
                  });
                  // set the bar chart data
                  this.setState({
                    barChartData: [
                      {
                        x: uniqueUsers,
                        y: ticketCount,
                        type: "bar",
                      },
                    ],
                  });
                });
              });
          }
        )
      );
  }

  // handle the selection of the sprint
  setSelectedSprint(event) {
    let filteredSprintTickets = [];
    this.state.sprints.forEach((element) => {
      if (element.sprintName === event.target.value) {
        this.setState({
          selectedSprint: element,
          selectedSprintName: element.sprintName,
        });
      }
    });
    // filter out the tickets based on the sprint name
    this.state.allTickets.forEach((element) => {
      if (element.sprint[0] === event.target.value) {
        filteredSprintTickets.push(element);
      }
    });
    // get the state to be displayed
    this.setState({ rowData: filteredSprintTickets }, () => {
      // get all tickets in done state
      let done = [];
      this.state.rowData.forEach((element) => {
        if (JSON.stringify(element.status) === JSON.stringify(["Done"])) {
          done.push(element);
        }
      });
      // get all tickets in in progress state
      let inprogress = [];
      this.state.rowData.forEach((element) => {
        if (
          JSON.stringify(element.status) === JSON.stringify(["In progress"])
        ) {
          inprogress.push(element);
        }
      });
      // get all tickets in open state
      let open = [];
      this.state.rowData.forEach((element) => {
        if (JSON.stringify(element.status) === JSON.stringify(["Open"])) {
          open.push(element);
        }
      });
      // set state of the pie chart
      this.setState({
        pieChartData: [
          {
            values: [inprogress.length, open.length, done.length],
            labels: ["In progress", "Open", "Done"],
            type: "pie",
          },
        ],
      });
      let users = [];
      let uniqueUsers = [];
      let ticketsAssigned = [];
      let ticketCount = [];
      this.state.rowData.forEach((element) => {
        users.push(element.assignedTo);
      });
      // get unique users
      uniqueUsers = Array.from(new Set(users));
      uniqueUsers.forEach((user) => {
        ticketsAssigned = [];
        this.state.rowData.forEach((element) => {
          if (user === element.assignedTo) {
            ticketsAssigned.push(element);
          }
        });
        // get ticket count assigned to unique users
        ticketCount.push(ticketsAssigned.length);
      });
      // set bar chart data
      this.setState({
        barChartData: [
          {
            x: uniqueUsers,
            y: ticketCount,
            type: "bar",
          },
        ],
      });
    });
  }

  render() {
    let options;
    if (this.state.sprints.length === 0) {
      options = <option>No sprints to select</option>;
    } else {
      options = this.state.sprints.map((sprint) => {
        return <option value={sprint.sprintName}> {sprint.sprintName} </option>;
      });
    }
    return (
      <div className="report">
        <select
          name="sprints"
          id="sprints"
          value={this.state.selectedSprintName}
          onChange={this.setSelectedSprint.bind(this)}
          ref={(c) => (this.selectedSprintName = c)}
        >
          {options}
        </select>
        <div className="plot-div">
          <Plot
            data={this.state.pieChartData}
            layout={this.state.pieChartLayout}
            onInitialized={(figure) => this.setState(figure)}
            onUpdate={(figure) => this.setState(figure)}
          />
          <Plot
            data={this.state.barChartData}
            layout={this.state.barChartLayout}
            onInitialized={(figure) => this.setState(figure)}
            onUpdate={(figure) => this.setState(figure)}
          />
        </div>
      </div>
    );
  }
}

export default Reports;
