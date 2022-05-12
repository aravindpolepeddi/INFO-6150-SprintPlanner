import Mongoose from "mongoose";

//Creation of a Sprint Schema
const SprintSchema = new Mongoose.Schema(
  {
    sprintName: {
      type: String,
      required: "sprint name is required",
    },
    status: {
      type: [
        {
          type: String,
          enum: ["Active", "Inactive"],
        },
      ],
    },
    sprintDuration: {
      type: String,
      // default: "1 Week",
    },
    startDate: {
      type: Date,
      // default: Date.now,
    },
    endDate: {
      type: Date,
      // default: Date.now,
    },
    task_id: {
      type: Array,
      // required: "Task Ids are required",
    },
  },
  {
    versionKey: false,
  }
);

SprintSchema.virtual("id", () => {
  return this._id.toHexString();
});

SprintSchema.set("toJSON", { virtuals: true });

const Sprint = Mongoose.model("Sprint", SprintSchema);

export default Sprint;
