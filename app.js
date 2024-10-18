const express = require("express");
const morgan = require("morgan");
const expressEjsLayout = require("express-ejs-layouts");

const usersRoute = require("./routes/usersRoute");
const carsRoute = require("./routes/carsRoute");
const sparepartsRoute = require("./routes/sparepartsRoute");
const driverRoutes = require("./routes/driverRoute");
const dashboardRoutes = require("./routes/dashboardRoute");

const app = express();
const port = 3000;

// Reading json from body (client)
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(morgan());

// contoh middleware yang berisi yang dibuat sendiri
app.use((req, res, next) => {
  console.log("incoming request");
  // better logging di bawahnya
  next();
});

// logging middleware basic
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // better logging di bawahnya
  next();
});

// logging middleware basic
app.use((req, res, next) => {
  req.username = "NeoBitose";
  // better logging di bawahnya
  next();
});

// midleware static file
app.use(express.static(`${__dirname}/public`))

// View Engine
app.set("view engine", "ejs");

// set ejs layout
app.use(expressEjsLayout);
app.set("layout", "layout");

// Health Check
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Succeed",
      message: "Ping successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Ping failed",
      isSuccess: false,
      error: error.message,
    });
  }
});

// Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/spareparts", sparepartsRoute);
app.use("/api/v1/drivers", driverRoutes);

app.use("/admin", dashboardRoutes);

// Middleware to handle page not found
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});