
import * as service from "../services/ticket-service.js";
import nodemailer from 'nodemailer';
//var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'inventorymanagementaas@gmail.com',
    pass: 'aas051997'
  }
});

// set the success response
const setSuccessResponse = (obj, response) => {
  // success status is 200
  response.status(200);
  response.json(obj);
};

// set the error response
const setErrorResponse = (error, response) => {
  // error status is 500
  response.status(500);
  response.json(error);
};

// create a new ticket
export const post = async (request, response) => {
  try {
    const payload = request.body;
    const ticket = await service.save(payload);

    var mailOptions = {
      from: 'inventorymanagementaas@gmail.com',
      to: payload.assigneeEmailID[0],
      //to: 'polepeddiaravind@gmail.com',
      subject: 'A ticket has been assigned to you',
      html: '<h1>Greetings from SprintManager</h1><br><p>The ticket: '+payload.name+' has been assigned to you</p><br><p>ReportedBy:'+payload.createdBy+' </p><br><p>Description:'+payload.description+'</p><br><p>Ticket Type: '+payload.ticketType[0]+'</p>'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
        // set the success response
    setSuccessResponse(ticket, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// search for a particular ticket
export const index = async (request, response) => {
  // try the querying with ticket id
  try {
    //   since the id is added as a query to the url - use request.query
    const id = request.query.id;
    const query = {};
    // add to query only when title is added to the url as query param
    if (id) {
      query.id = id;
    }

    const ticket = await service.search(query);
    // set the success response
    setSuccessResponse(ticket, response);
  } catch (error) {
    // set the error response
    setErrorResponse(error, response);
  }
};

// get the ticket based on the id
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const ticket = await service.get(id);
    setSuccessResponse(ticket, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// update a ticket
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    // the updated todo needs to be the request body
    const updated = { ...request.body };
    updated.id = id;
    const ticket = await service.update(updated);

    var mailOptions = {
      from: 'inventorymanagementaas@gmail.com',
      to: updated.assigneeEmailID[0],
      //to: 'polepeddiaravind@gmail.com',
      subject: 'A ticket has been assigned to you',
      html: '<h1>Greetings from SprintManager</h1><br><p>The ticket: '+updated.name+' has been assigned to you</p><br><p>ReportedBy:'+updated.createdBy+' </p><br><p>Description:'+updated.description+'</p><br><p>Ticket Type: '+updated.ticketType[0]+'</p>'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    // set the success response
    setSuccessResponse(ticket, response);
  } catch (error) {
    // set the error response
    setErrorResponse(error, response);
  }
};

// delete a ticket
export const remove = async (request, response) => {
  try {
    // since the id to be deleted is a url param - use request.params
    const id = request.params.id;
    await service.remove(id);
    // set the success response with a message
    setSuccessResponse({ message: `ticket deleted ${id}` }, response);
  } catch (error) {
      // set the error response
    setErrorResponse(error, response);
  }
};
