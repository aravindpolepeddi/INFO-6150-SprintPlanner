/* eslint-disable eqeqeq */
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ChangeDetectionStrategyType } from "ag-grid-react/lib/shared/changeDetectionService";
import "./TaskList.scss";
import ticketApis from "../../services/tickets-service.js";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Button from "react-bootstrap/Button";
import * as AiIcons from "react-icons/ai";
import * as VscIcons from "react-icons/vsc";
import CreateTicket from "./../../NavBar/CreateTicket/CreateTicket";
import sprintApis from "../../services/sprint-service";
import moment from "moment";
import CreateSprint from "../../NavBar/CreateSprint/CreateSprint";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultColDef: {
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        resizable: true,
      },
      isOpen: false,
      isEditMode: false,
      issueName: "",
      issueType: [],
      issueDescription: "",
      reporter: "",
      assignee: "",
      priority: [],
      taskId: "",
      isSprintActive: false,
      selectedSprint: [],
      sprints: [],
      allTickets: [],
      selectedSprintName: "",
      isSprintOpen: false,
      columnDefs: [
        { field: "name" },
        { field: "description" },
        { field: "assignedTo", width: "150" },
        { field: "status", width: "150" },
        { field: "ticketType", width: "150" },
        {
          field: "priority",
          width: "150",
          cellRenderer: function (params) {
            if (params.value == "Low") {
              return <AiIcons.AiOutlineArrowDown />;
            } else if (params.value == "Medium") {
              return <VscIcons.VscThreeBars />;
            } else if (params.value == "High") {
              return <AiIcons.AiOutlineArrowUp />;
            }
          },
        },
        {
          field: "edit",
          width: "110",
          cellRenderer: () => {
            return (
              <Button
                variant="light"
                onClick={this.getSelectedRowData.bind(this)}
              >
                <AiIcons.AiFillEdit />
              </Button>
            );
          },
        },
        {
          field: "delete",
          width: "110",
          cellRenderer: () => {
            return (
              <Button
                variant="light"
                onClick={this.deleteSelectedTicket.bind(this)}
              >
                <AiIcons.AiFillDelete />
              </Button>
            );
          },
        },
      ],
      rowData: [],
    };
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  openSprintModal = () => this.setState({ isSprintOpen: true });
  closeSprintModal = () => this.setState({ isSprintOpen: false });

  componentDidMount() {
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
                this.setState({ rowData: filteredSprintTickets });
              });
          }
        )
      );
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  getSelectedRowData = () => {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    this.setState({
      isOpen: true,
      isEditMode: true,
      issueName: selectedData[0].name,
      issueDescription: selectedData[0].description,
      priority: selectedData[0].priority[0],
      assignee: selectedData[0].assignee,
      reporter: selectedData[0].reporter,
      issueType: selectedData[0].ticketType[0],
      taskId: selectedData[0].id,
    });
  };

  deleteSelectedTicket() {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    ticketApis.deleteTicket(selectedData[0].id).then((result) => {
      ticketApis
        .getAllTickets()
        .then((result) => result.json())
        .then((res) => {
          this.setState({ allTickets: res });
          let filteredSprintTickets = [];
          res.forEach((element) => {
            if (element.sprint[0] === this.state.selectedSprint.sprintName) {
              filteredSprintTickets.push(element);
            }
          });
          this.setState({ rowData: filteredSprintTickets });
        });
    });
  }

  handleCreateTicket() {
    this.setState({
      isOpen: true,
      isEditMode: false,
      issueName: "",
      issueDescription: "",
      priority: "",
      assignee: "",
      reporter: "",
      issueType: "",
      taskId: "",
    });
  }

  getUniqueListBy(arr) {
    return [...new Map(arr.map((item) => [item["id"], item])).values()];
  }

  handleCallback = (childData) => {
    if (this.state.isEditMode) {
      let updatedRowData = [...this.state.rowData, childData];
      let uniqueRowData = this.getUniqueListBy(updatedRowData);
      this.setState({ rowData: uniqueRowData });
    } else {
      this.setState(
        { allTickets: [...this.state.allTickets, childData] },
        () => {
          let filteredSprintTickets = [];
          this.state.allTickets.forEach((element) => {
            if (element.sprint[0] === this.state.selectedSprint.sprintName) {
              filteredSprintTickets.push(element);
            }
          });
          this.setState({ rowData: filteredSprintTickets });
        }
      );
    }
    this.closeModal();
  };

  handleSprintCallback(childData) {
    this.setState({ sprints: [...this.state.sprints, childData] });
    this.closeSprintModal();
  }

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
    this.state.allTickets.forEach((element) => {
      if (element.sprint[0] === event.target.value) {
        filteredSprintTickets.push(element);
      }
    });
    this.setState({ rowData: filteredSprintTickets });
  }

  handleSprint() {
    const payload = {
      name: this.state.selectedSprint.sprintName,
      duration: this.state.selectedSprint.sprintDuration,
      status: ["Active"],
      startDate: moment(),
      endDate: moment().add(
        parseInt(this.state.selectedSprint.sprintDuration, 10),
        "week"
      ),
    };
    sprintApis
      .updateSprint(this.state.selectedSprint.id, payload)
      .then((result) => result.json());
    this.setState({ selectedSprint: payload });
  }

  render() {
    let options;
    let sprintLength = this.state.sprints.length;
    let activeStatus;
    let createButton;
    if (sprintLength === 0) {
      options = <option>No sprints to select</option>;
    } else {
      options = this.state.sprints.map((sprint) => {
        return <option value={sprint.sprintName}> {sprint.sprintName} </option>;
      });
      createButton = (
        <Button variant="primary" onClick={this.handleCreateTicket.bind(this)}>
          Create Ticket
        </Button>
      );
      if (this.state.selectedSprint) {
        if (
          JSON.stringify(this.state.selectedSprint.status) ===
          JSON.stringify(["Active"])
        ) {
          activeStatus = (
            <span>
              Start date :{" "}
              {moment(this.state.selectedSprint.startDate).format(
                "MMM Do YYYY"
              )}{" "}
              - End date :{" "}
              {moment(this.state.selectedSprint.endDate).format("MMM Do YYYY")}
            </span>
          );
        } else {
          activeStatus = (
            <Button variant="primary" onClick={this.handleSprint.bind(this)}>
              Start Sprint
            </Button>
          );
        }
      }
    }
    return (
      <div className="tasklist">
        <div className="edit-ticket-btn">
          <div className="sprint-div">
            <select
              name="sprints"
              id="sprints"
              value={this.state.selectedSprintName}
              onChange={this.setSelectedSprint.bind(this)}
              ref={(c) => (this.selectedSprintName = c)}
            >
              {options}
            </select>
            <Button variant="primary" onClick={this.openSprintModal}>
              Create Sprint
            </Button>
          </div>
          {activeStatus}
        </div>

        <div className="ag-theme-alpine ag-grid-tasklist">
          <AgGridReact
            rowDataChangeDetectionStrategy={
              ChangeDetectionStrategyType.IdentityCheck
            }
            rowData={this.state.rowData}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            onCellValueChanged={this.getSelectedRowData}
            onGridReady={this.onGridReady}
            rowSelection={"single"}
          ></AgGridReact>
        </div>
        <div className="create-ticket-btn">{createButton}</div>
        <CreateTicket
          parentCallback={this.handleCallback.bind(this)}
          isOpen={this.state.isOpen}
          isEditMode={this.state.isEditMode}
          issueName={this.state.issueName}
          issueDescription={this.state.issueDescription}
          priority={[this.state.priority]}
          assignee={this.state.assignee}
          reporter={this.state.reporter}
          issueType={[this.state.issueType]}
          taskId={this.state.taskId}
        ></CreateTicket>
        <CreateSprint
          sprintParentCallback={this.handleSprintCallback.bind(this)}
          isSprintOpen={this.state.isSprintOpen}
        ></CreateSprint>
      </div>
    );
  }
}

export default TaskList;
