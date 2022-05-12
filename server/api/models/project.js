import Mongoose from "mongoose";

//Creation of a project Schema
const ProjectSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: "Project Name is required",
    },
    url: {
      type: String,
      required: "Github Url is required",
    },
    description: {
      type: String,
      required: "Description is required",
    },
    scrumTeam: {
      type: Array,
    },
    scrumDuration: {
      type: Array
    },
    scrumIds: {
      type: Array
    }
  },
  {
    versionKey: false,
  }
);

ProjectSchema.set("toJSON", { virtuals: true });

const Project = Mongoose.model("Project", ProjectSchema);

export default Project;
