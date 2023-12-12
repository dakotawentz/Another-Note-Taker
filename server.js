const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;
const util = require("util");

const html_routes = require("./routes/htmlRoutes");
const api_routes = require("./routes/apiRoutes");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', api_routes);
app.use('/', html_routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
