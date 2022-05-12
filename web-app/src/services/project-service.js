// Creating the function updateProjects and createProjects so that the user can create and update the project
const API_URL = "http://localhost:9000/projects";

// fetch get all projects
function getAllProjects() {
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// fetch update project
function updateProjects(id, updatedStatus) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStatus),
  });
}

// fetch create project
function createProject(proj) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proj),
  });
}

const projectApis = { getAllProjects, updateProjects, createProject };

export default projectApis;
