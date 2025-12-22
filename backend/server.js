
// const express = require("express"); 
const app = require("./app");
const connectDatabase = require("./db/Database");

//config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/.env" });
}

// connect dbs
connectDatabase();

module.exports = app;
