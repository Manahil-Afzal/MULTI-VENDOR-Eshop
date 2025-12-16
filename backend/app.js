const express = require ("express");
// const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const cookieParser = require ("cookie-parser");
const bodyParser = require ("body-parser");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");
const path = require("path");

app.use(cors({
  origin:[ "https://multi-vendor-e-shop-frontend.vercel.app" , "http://localhost:5173"],
  credentials: true,
}));


app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit:"50mb"}));


//config 
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv")
  .config({
     path: "config/.env",
  });
}

// imports routes
const user = require("./controller/user");
const  shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const  coupon = require("./controller/couponCode");
const  payment = require("./controller/payment");
const  order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message") 
const withdraw = require("./controller/withdraw");


app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);



app.use(errorMiddleware);


app.use("/", (req, res)=>{
     res.send("Hello Vercel");
})

// app.use(ErrorHandler);
module.exports = app;