import * as service from "../services/sprint-service.js";

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

// create a new sprint
export const post = async (request, response) => {
  try {
    const payload = request.body;
    const sprint = await service.save(payload);
    // set the success response
    setSuccessResponse(sprint, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// search for a particular sprint
export const index = async (request, response) => {
  // try the querying with sprint id
  try {
    //   since the id is added as a query to the url - use request.query
    const id = request.query.id;
    const query = {};
    // add to query only when title is added to the url as query param
    if (id) {
      query.id = id;
    }

    const sprint = await service.search(query);
    // set the success response
    setSuccessResponse(sprint, response);
  } catch (error) {
    // set the error response
    setErrorResponse(error, response);
  }
};

// get the ticket based on the id
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const sprint = await service.get(id);
    setSuccessResponse(sprint, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// update a sprint
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    // the updated todo needs to be the request body
    const updated = { ...request.body };
    updated.id = id;
    const sprint = await service.update(updated);
    // set the success response
    setSuccessResponse(sprint, response);
  } catch (error) {
    // set the error response
    setErrorResponse(error, response);
  }
};