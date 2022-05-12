// Create Sprint Function
import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/js/bootstrap.min.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import sprintApis from "../../services/sprint-service.js";
require("react-bootstrap/ModalHeader");

class Sprint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSprintOpen: this.props.isSprintOpen,
      sprintName: "",
      sprintDuration: "",
      sprintGoal: "",
      ismatches: false,
      error: "",

      // TicketSprint: "",
    };
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleTextAreaInputChange = this.handleTextAreaInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isSprintOpen: nextProps.isSprintOpen });
  }

  // openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isSprintOpen: false, error: "" });

  //create sprint
  createSprint() {
    // const { sprintName, sprintDuration } = this.state;
    const status = ["Inactive"];
    const startDate = "";
    const endDate = "";
    const payload = {
      sprintName: this.name.value,
      sprintDuration: this.type.value,
      status,
      startDate,
      endDate,
    };

    if (!payload.sprintName || !payload.sprintDuration) {
      this.setState({ error: "All fields are mandatory" });
      return;
    } else {
      sprintApis.createSprint(payload).then((res) => res.json());
      this.props.sprintParentCallback(payload);
      this.closeModal();
    }
    // {
    // this.setState({
    //     sprintName: "",
    //     sprintDuration: "",
    //     sprintGoal: "",
    // })
    // });
  }

  // handleChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //   console.log(event);
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  //onchange of Issue
  handleIssueType = (e) => {
    this.setState({ sprintDuration: e.target.value });
  };

  //onchange of Goal field
  handleTextAreaInputChange(event) {
    this.setState({
      sprintGoal: event.target.value,
    });
  }

  //onchange of sprintName
  handleTextInputChange(event) {
    sprintApis.getAllSprints().then((res) => {
      res.json().then((a) =>
        a.forEach((element) => {
          if (element.sprintName.includes(event.target.value)) {
            this.setState({
              ismatches: true,
            });
          } else {
            this.setState({
              sprintName: this.name,
              ismatches: false,
            });
          }
        })
      );
    });
  }

  render() {
    return (
      <Modal show={this.state.isSprintOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Sprint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.error !== "" ? (
            <div className="error">{this.state.error}</div>
          ) : (
            ""
          )}
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <Form.Control
                as="input"
                onChange={this.handleTextInputChange.bind(this)}
                ref={(c) => (this.name = c)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Goal</label>
              <Form.Control
                as="textarea"
                rows="3"
                name="address"
                onChange={this.handleTextAreaInputChange.bind(this)}
                ref={(c) => (this.description = c)}
              />
            </div>
            <div className="mb-3 dropdown-ct">
              <label className="form-label">Sprint Duration</label>
              <select
                onChange={this.handleIssueType.bind(this)}
                ref={(c) => (this.type = c)}
              >
                <option value="1">1 Week</option>
                <option value="2">2 Weeks</option>
                <option value="3">3 Weeks</option>
                <option value="4">4 Weeks</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.createSprint.bind(this)}
            disabled={this.state.ismatches}
          >
            Create Sprint
          </button>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Sprint;
