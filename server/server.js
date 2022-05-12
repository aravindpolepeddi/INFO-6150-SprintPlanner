// initialize express and make it listen to a port on localhost

import app from "./api/app.js";

// set the port where the server should run
const port = 9000;

app.listen(port, () => {
  console.log(`server running at ${port}`);
});