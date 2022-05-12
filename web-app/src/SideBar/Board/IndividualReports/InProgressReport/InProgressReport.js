import React from "react";
import Plot from "react-plotly.js";

class InProgressReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data to be sent to the plot
      data: [
        {
          values: [this.props.inProgressTicket, this.props.totalTickets],
          labels: ["In progress", "Total tickets"],
          type: "pie",
        },
      ],
      // set the layout
      layout: {
        autosize: false,
        height: 530,
        width: 370,
      },
    };
  }
  // set the nextProps to get the updated value
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: [
        {
          values: [nextProps.inProgressTicket, nextProps.totalTickets],
          labels: ["In progress", "Total tickets"],
          type: "pie",
        },
      ],
    });
  }
  render() {
    return (
      <div className="report">
        <Plot
          data={this.state.data}
          layout={this.state.layout}
          onInitialized={(figure) => this.setState(figure)}
          onUpdate={(figure) => this.setState(figure)}
        />
      </div>
    );
  }
}

export default InProgressReport;
