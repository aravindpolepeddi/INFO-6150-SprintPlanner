import Project from "../models/project.js";


// create a new ticket
export const save = (newProject) => {
  const project = new Project(newProject);
  return project.save();
};

// // search for a ticket item by query
// export const search = (query) => {
//   const params = { ...query };
//   // will be an array of promise
//   return Ticket.find(params).exec();
// };

// get a single ticket
export const get = (id) => {
  const project = Project.findById(id).exec();
  return project;
};


// update a ticket
export const update = (updatedProj) => {
    updatedTodo.modifiedDate = new Date();
  const project = Project.findByIdAndUpdate(
    updatedProj.id,
    updatedProj,
    {new: true}
  ).exec();
  return project;
};

// remove/ delete a todo item
// export const remove = (id) => {
//   const todo = TicketSchema.findByIdAndDelete(id).exec();
//   return todo;
// };