import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import sprintApis from "../../services/sprint-service";
import ticketApis from "../../services/tickets-service";
import "./Board.scss";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as VscIcons from "react-icons/vsc";
import * as MdIcons from "react-icons/md";
// Code the Board Component
// import { connect } from "react-redux";
import ReactCardFlip from "react-card-flip";
import DoneReport from "./IndividualReports/DoneReport/DoneReport";
import InProgressReport from "./IndividualReports/InProgressReport/InProgressReport";
import OpenReport from "./IndividualReports/OpenReport/OpenReport";

// function mapStateToProps(state) {
//   const sprint = state.sprint;
//   // const text = state.text;
//   return {
//     sprint,
//     // text
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setSprint: (sprint) => dispatch(setSprint(sprint)),
//   };
// };
class BoardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprints: [],
      tickets: [],
      filteredTickets: [],
      filteredSprintTickets: [],
      isOpenFlip: false,
      isInProgressFlip: false,
      isDoneFlip: false,
      searchWord: "",
    };
  }
  isOnlyMyIssuesChecked = false;
  isHighPriorityIssueChecked = false;

  // handle the assigned to me issue btn
  handleAssignedTo() {
    let filtered = [];
    this.isOnlyMyIssuesChecked = !this.isOnlyMyIssuesChecked;
    this.isHighPriorityIssueChecked = false;
    if (this.isOnlyMyIssuesChecked) {
      // TODO change it to the logged in user
      this.state.filteredSprintTickets
        .filter((ticket) => ticket.assignedTo.includes("Aravind"))
        .map((ticket) => filtered.push(ticket));
      this.setState({ filteredTickets: filtered });
    } else {
      this.setState({ filteredTickets: this.state.filteredSprintTickets });
    }
  }

  // handle the high priority btn
  handleHighPriorityIssue() {
    let filtered = [];
    this.isHighPriorityIssueChecked = !this.isHighPriorityIssueChecked;
    this.isOnlyMyIssuesChecked = false;
    if (this.isHighPriorityIssueChecked) {
      this.state.filteredSprintTickets
        .filter((ticket) => ticket.priority[0].includes("High"))
        .map((ticket) => filtered.push(ticket));
      this.setState({ filteredTickets: filtered });
    } else {
      this.setState({ filteredTickets: this.state.filteredSprintTickets });
    }
  }

  // handle card flip click for tickets in progress
  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      isInProgressFlip: !prevState.isInProgressFlip,
    }));
  }

  // handle card flip click for all open tickets
  handleOpenTicClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      isOpenFlip: !prevState.isOpenFlip,
    }));
  }
  // handle card flip click for all open tickets
  handleDoneTicClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      isDoneFlip: !prevState.isDoneFlip,
    }));
  }

  componentDidMount() {
    sprintApis
      .getAllSprints()
      .then((result) => result.json())
      .then((sprints) =>
        this.setState({ sprints, selectedSprint: sprints[0] }, () => {
          ticketApis
            .getAllTickets()
            .then((result) => result.json())
            .then((res) => {
              this.setState({ tickets: res });
              let filteredSprintTickets = [];
              res.forEach((element) => {
                if (
                  element.sprint[0] === this.state.selectedSprint.sprintName
                ) {
                  filteredSprintTickets.push(element);
                }
              });
              this.setState({
                filteredSprintTickets: filteredSprintTickets,
                filteredTickets: filteredSprintTickets,
              });
            });
        })
      );
  }

  // handl the sprint selection from the dropdown
  handleSprintSelection(event) {
    let filteredSprintTics = [];
    this.state.tickets.forEach((element) => {
      if (element.sprint[0] === event.target.value) {
        filteredSprintTics.push(element);
      }
    });
    this.setState({
      filteredSprintTickets: filteredSprintTics,
      filteredTickets: filteredSprintTics,
    });
  }

  displayTicketsBySearchBox() {
    let filtered = [];
    console.log("displayTicketsBySearchBox()");
    if (this.state.searchWord !== "") {
      this.state.filteredSprintTickets
        .filter((ticket) =>
          ticket.name
            .toLowerCase()
            .includes(this.state.searchWord.toLowerCase())
        )
        .map((ticket) => filtered.push(ticket));
      this.setState({ filteredTickets: filtered });
    } else {
      this.setState({ filteredTickets: this.state.filteredSprintTickets });
    }
    console.log(this.state.filteredTickets);
  }

  render() {
    const sprintLength = this.state.sprints.length;
    let options;
    let ticketDone = [];
    let ticketOpen = [];
    let ticketInProgress = [];
    let ticketDoneOptions;
    let ticketInProgressOptions;
    let ticketOpenOptions;
    let checkedOnlyMyIssue;
    let checkedHighPriIssue;
    // if only my issues is checked
    if (this.isOnlyMyIssuesChecked) {
      checkedOnlyMyIssue = <AiIcons.AiOutlineCheck />;
    }
    // check for high priority issye
    if (this.isHighPriorityIssueChecked) {
      checkedHighPriIssue = <AiIcons.AiOutlineCheck />;
    }
    // get all tickets in done state
    this.state.filteredTickets.forEach((element) => {
      if (element.status[0] === "Done") {
        ticketDone.push(element);
      }
    });
    // get all tickets in open state
    this.state.filteredTickets.forEach((element) => {
      if (element.status[0] === "Open") {
        ticketOpen.push(element);
      }
    });
    // get all tickets in in-progress state
    this.state.filteredTickets.forEach((element) => {
      if (element.status[0] === "In progress") {
        ticketInProgress.push(element);
      }
    });
    // get a list of all the done tickets and display in the card
    if (ticketDone.length === 0) {
      <span>No ticket in done state</span>;
    } else {
      let type;
      let priority;
      ticketDoneOptions = ticketDone.map((ticket) => {
        if (ticket.ticketType[0] === "Bug") {
          type = <AiIcons.AiOutlineBug />;
        } else if (ticket.ticketType[0] === "Task") {
          type = <BiIcons.BiTask />;
        } else {
          type = <BsIcons.BsFillBookmarkFill />;
        }
        if (ticket.priority[0] === "High") {
          priority = <AiIcons.AiOutlineArrowUp />;
        } else if (ticket.priority[0] === "Medium") {
          priority = <VscIcons.VscThreeBars />;
        } else {
          priority = <AiIcons.AiOutlineArrowDown />;
        }
        return (
          <ListGroup.Item>
            <Card>
              <Card.Body>
                <Card.Title>{ticket.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {ticket.description}
                </Card.Subtitle>
                <div className="card-text-div">
                  <Card.Text>
                    {priority} {type}
                  </Card.Text>
                  <Card.Text>{ticket.assignedTo}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        );
      });
    }
    // get the list of all the in progress ticket and display in the card
    if (ticketInProgress.length === 0) {
      <span>No ticket in done state</span>;
    } else {
      let type;
      let priority;
      ticketInProgressOptions = ticketInProgress.map((ticket) => {
        if (ticket.ticketType[0] === "Bug") {
          type = <AiIcons.AiOutlineBug />;
        } else if (ticket.ticketType[0] === "Task") {
          type = <BiIcons.BiTask />;
        } else {
          type = <BsIcons.BsFillBookmarkFill />;
        }
        if (ticket.priority[0] === "High") {
          priority = <AiIcons.AiOutlineArrowUp />;
        } else if (ticket.priority[0] === "Medium") {
          priority = <VscIcons.VscThreeBars />;
        } else {
          priority = <AiIcons.AiOutlineArrowDown />;
        }
        return (
          <ListGroup.Item>
            <Card>
              <Card.Body>
                <Card.Title>{ticket.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {ticket.description}
                </Card.Subtitle>
                <div className="card-text-div">
                  <Card.Text>
                    {priority} {type}
                  </Card.Text>
                  <Card.Text>{ticket.assignedTo}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        );
      });
    }
    // get the list of all the open tickets and display in the card layout
    if (ticketOpen.length === 0) {
      <span>No ticket in done state</span>;
    } else {
      let type;
      let priority;
      ticketOpenOptions = ticketOpen.map((ticket) => {
        if (ticket.ticketType[0] === "Bug") {
          type = <AiIcons.AiOutlineBug />;
        } else if (ticket.ticketType[0] === "Task") {
          type = <BiIcons.BiTask />;
        } else {
          type = <BsIcons.BsFillBookmarkFill />;
        }
        if (ticket.priority[0] === "High") {
          priority = <AiIcons.AiOutlineArrowUp />;
        } else if (ticket.priority[0] === "Medium") {
          priority = <VscIcons.VscThreeBars />;
        } else {
          priority = <AiIcons.AiOutlineArrowDown />;
        }
        return (
          <ListGroup.Item>
            <Card>
              <Card.Body>
                <Card.Title>{ticket.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {ticket.description}
                </Card.Subtitle>
                <div className="card-text-div">
                  <Card.Text>
                    {priority} {type}
                  </Card.Text>
                  <Card.Text>{ticket.assignedTo}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        );
      });
    }
    // sprint length check for the dropdown
    if (sprintLength === 0) {
      options = <option>No sprints to select</option>;
    } else {
      options = this.state.sprints.map((sprint) => {
        return <option value={sprint.sprintName}> {sprint.sprintName} </option>;
      });
    }
    return (
      <div className="board">
        <div className="board-btns">
          <div className="board-btns-div1">
            <select
              name="sprints"
              id="sprints"
              onChange={this.handleSprintSelection.bind(this)}
            >
              {options}
            </select>
            <Button variant="light" onClick={this.handleAssignedTo.bind(this)}>
              {checkedOnlyMyIssue}
              Only my issues
            </Button>
            <Button
              variant="light"
              onClick={this.handleHighPriorityIssue.bind(this)}
            >
              {checkedHighPriIssue}
              Only high priority issue
            </Button>
          </div>
          <div className="search-bar">
            <FormControl
              type="search"
              placeholder="Search by ticket name"
              className="me-2"
              aria-label="Search"
              onChange={(event) =>
                this.setState({ searchWord: event.target.value })
              }
            />
            <Button
              variant="primary"
              onClick={this.displayTicketsBySearchBox.bind(this)}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="card-div">
          <Card>
            <Card.Body>
              <Card.Title>Open</Card.Title>
            </Card.Body>
            <ReactCardFlip
              isFlipped={this.state.isOpenFlip}
              flipDirection="horizontal"
            >
              <div>
                <ListGroup variant="flush">{ticketOpenOptions}</ListGroup>
                <Button
                  variant="light"
                  onClick={this.handleOpenTicClick.bind(this)}
                >
                  <MdIcons.MdOutlineFlipCameraAndroid />
                </Button>
              </div>
              <div>
                <OpenReport
                  totalTickets={this.state.filteredTickets.length}
                  openTicket={ticketOpen.length}
                />
                <Button
                  variant="light"
                  onClick={this.handleOpenTicClick.bind(this)}
                >
                  <MdIcons.MdOutlineFlipCameraAndroid />
                </Button>
              </div>
            </ReactCardFlip>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>In progress</Card.Title>
            </Card.Body>
            <ReactCardFlip
              isFlipped={this.state.isInProgressFlip}
              flipDirection="horizontal"
            >
              <div>
                <ListGroup variant="flush">{ticketInProgressOptions}</ListGroup>
                <Button variant="light" onClick={this.handleClick.bind(this)}>
                  <MdIcons.MdOutlineFlipCameraAndroid />
                </Button>
              </div>
              <div>
                <InProgressReport
                  totalTickets={this.state.filteredTickets.length}
                  inProgressTicket={ticketInProgress.length}
                />
                <Button variant="light" onClick={this.handleClick.bind(this)}>
                  <MdIcons.MdOutlineFlipCameraAndroid />
                </Button>
              </div>
            </ReactCardFlip>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Done</Card.Title>
            </Card.Body>
            <ReactCardFlip
              isFlipped={this.state.isDoneFlip}
              flipDirection="horizontal"
            >
              <div>
                <ListGroup variant="flush">{ticketDoneOptions}</ListGroup>
                <Button
                  variant="light"
                  onClick={this.handleDoneTicClick.bind(this)}
                >
                  <MdIcons.MdOutlineFlipCameraAndroid />
                </Button>
              </div>
              <div>
                <DoneReport
                  totalTickets={this.state.filteredTickets.length}
                  doneTicket={ticketDone.length}
                />
                <Button
                  variant="light"
                  onClick={this.handleDoneTicClick.bind(this)}
                >
                  <MdIcons.MdOutlineFlipCameraAndroid />
                </Button>
              </div>
            </ReactCardFlip>
          </Card>
        </div>
      </div>
    );
  }
}
// const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);
export default BoardComponent;
