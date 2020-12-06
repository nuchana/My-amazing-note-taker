
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing/ route middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api",apiRoutes);
app.use("/",htmlRoutes);


// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// start the server on the port
app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));