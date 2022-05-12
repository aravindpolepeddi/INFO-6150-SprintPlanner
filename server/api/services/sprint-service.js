import Sprint from "../models/sprint.js";

// create a new sprint
export const save = (newSprint) => {
  const sprint = new Sprint(newSprint);
  return sprint.save();
};

// search for a sprint item by query
export const search = (query) => {
  const params = { ...query };
  // will be an array of promise
  return Sprint.find(params).exec();
};

// get a single ticket
export const get = (id) => {
  const sprint = Sprint.findById(id).exec();
  return sprint;
};

// update a ticket
export const update = (updatedTodo) => {
  updatedTodo.modifiedDate = new Date();
  const sprint = Sprint.findByIdAndUpdate(updatedTodo.id, updatedTodo, {
    new: true,
  }).exec();
  return sprint;
};

// remove/ delete a todo item
// export const remove = (id) => {
//   const todo = TicketSchema.findByIdAndDelete(id).exec();
//   return todo;
// };
