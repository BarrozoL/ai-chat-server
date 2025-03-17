const dotenv = require("dotenv");
const connectDB = require("./db/index.js");
const app = require("./app.js");
dotenv.config();

const PORT = process.env.PORT || 5005;
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
    // Optionally exit the process if you cannot connect:
    process.exit(1);
  });

module.exports = app;
