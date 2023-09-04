import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword} = req.body;

    if (!userEmail) {
      const err = new Error("User email is required");
      err.statusCode = 400;
      throw err;
    }



    const alreadyExists = await User.findOne({ userEmail });

    if (alreadyExists) {
      const err = new Error("You already have an account! Please Login");
      err.statusCode = 400;
      throw err;
    }
    
    const saltRounds = 11;
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    const user = new User({
      userName,
      userEmail,
      userPassword: hashedPassword,
    });

    const newUser = await user.save();

    res.status(201).send("User successfully added!");
  } catch (error) {
    next(error);
  }
};

//get single user

export const getUser = async (req, res, next) => {
  try {
    const { userName } = req.params; 
    const user = await User.findOne({ userName });

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}