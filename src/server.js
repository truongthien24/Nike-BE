require("dotenv").config();
const express = require("express"); // commonjs
const morgan = require("morgan");
const configViewEngie = require("./config/viewEngine");
const webRoute = require("./routes/web");
const apiRoute = require("./routes/api");
const connection = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerDocs = require("./utils/swagger");

const app = express(); // app express
const port = process.env.PORTDEV || 8888;
const hostname = process.env.HOST_NAME;

// Config req.body
// app.use(express.json()); // for json
// app.use(express.urlencoded({ extended: true })); // for form data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for form data

// Config template engine
configViewEngie(app);

// morgan.token('body', (req, res) => JSON.stringify(req['body']));

app.use(cors({ origin: true }));

// Khai báo route
app.use("/", webRoute);
app.use("/api", apiRoute);


app.listen(port, hostname, () => {
  console.log(`Server running at port ${port}`);
  swaggerDocs(app, port)
});
