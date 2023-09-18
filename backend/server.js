import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import connectDB from "./db.js"


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5600;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2 routes for users and products
app.use("/users", userRoutes);
app.use("/products", productRoutes);


//global error handler
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Something went wrong";
  res.status(error.statusCode).send(error.message);
});
//control route for postman
app.get("/", (req, res) => {
  res.send("Welcome User ");
});
//connection to shop database MongoDB
connectDB();

app.listen(5000, () => {
  console.log(`server is running at port ${PORT}`);
});
