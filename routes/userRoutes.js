import express from "express";
import {createUser} from "../controllers/userController.js";
import {loginHandler} from "../controllers/authentController.js"

const router = express.Router();

// http://localhost:5000/users/sign-in (POST)
//http://localhost:5000/users/sign-up (POST)
router.post("/sign-in", loginHandler)  //validate input to add
router.post("/create-user", createUser)



//router.delete("/:id", authorization,deleteUser);
//router.get("/list",adminAuth, getAllUsers)
//router.put("/change-password/:id",authorization,passwordChangeHandler)}
export default router;
