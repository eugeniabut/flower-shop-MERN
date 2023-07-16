import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword, userPasswordTwo } = req.body;

    const alreadyExists = await User.findOne({ userEmail });

    if (alreadyExists) {
      const err = new Error("User already exists");
      err.statusCode = 400;
      throw err;
    }

    if (userPassword !== userPasswordTwo) {
      const err = new Error("Passwords do not match");
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
export const getUser = async (req, res,next) => {
  try {
   const userName = await User.find({userName})
   res.status(201).json(userName)
   
  } catch (err) {
    console.error('Error fetching products:', err);
  }
   next(err)
  }