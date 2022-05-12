const API_URL = "http://localhost:9000/sprints";

// fetch get all sprints
function getAllSprints() {
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// fetch update sprints
function updateSprint(id, updatedStatus) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStatus),
  });
}

// fetch create sprint
function createSprint(task) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

const sprintApis = { updateSprint, getAllSprints, createSprint };

export default sprintApis;
