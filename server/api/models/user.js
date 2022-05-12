import Mongoose from "mongoose";

//Creation of a user Schema
const UserSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    emailId: {
      type: String,
      required: [true, "Email Id is required"],
      unique: [true],
    },
    password: {
      type: String,
      required: [true, "Password is a required"],
    },
    projectId: {
      type: Array,
    },
    role: {
      type: [
        {
          type: String,
          enum: ["Developer", "Scrum Master", "Product Owner"],
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

//UserSchema.set("toJSON", { virtuals: true });

const User = Mongoose.model("User", UserSchema);

export default User;
