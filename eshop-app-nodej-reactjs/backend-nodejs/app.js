const express = require("express");
const cors = require("cors");
const Boom = require("boom");
const dotenv = require("dotenv");
require("./clients/db.js");
const limiter = require("./rate-limiter.js");
const routes = require("./routes/index.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Not Found Middleware
app.use((req, res, next) => {
  return next(Boom.notFound("This route does not exist."));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);

  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }

    return res.status(500).json(err);
  }
});

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
