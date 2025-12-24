const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("uncaughtException", (err) => {
  console.log("UncaughtException ShuttingDown...");
  console.log(err);
  app.close(() => {
    process.exit(1);
  });
});

process.on(" unhandledRejection", (err) => {
  console.log("UnhandledRejection ShuttingDown...");
  console.log(err.name, err.message);
  app.close(() => {
    process.exit(1);
  });
});
