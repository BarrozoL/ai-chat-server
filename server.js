const dotenv = require("dotenv");
const connectDB = require("./db/index.js");
const app = require("./app.js");
dotenv.config();

//Call the function to connect to DB
connectDB()
  .then(() => {
    console.log("MongoDB connected. Starting server...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

module.exports = app;
