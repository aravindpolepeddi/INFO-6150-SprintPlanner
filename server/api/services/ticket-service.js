import Ticket from "../models/ticket.js";


// create a new ticket
export const save = (newTicket) => {
  const ticket = new Ticket(newTicket);
  return ticket.save();
};

// search for a ticket item by query
export const search = (query) => {
  const params = { ...query };
  // will be an array of promise
  return Ticket.find(params).exec();
};

// get a single ticket
export const get = (id) => {
  const ticket = Ticket.findById(id).exec();
  return ticket;
};


// update a ticket
export const update = (updatedTodo) => {
    updatedTodo.modifiedDate = new Date();
  const ticket = Ticket.findByIdAndUpdate(
    updatedTodo.id,
    updatedTodo,
    {new: true}
  ).exec();
  return ticket;
};

// remove/ delete a ticket item
export const remove = (id) => {
  const ticket = Ticket.findByIdAndDelete(id).exec();
  return ticket;
};