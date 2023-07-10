import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword, userPasswordTwo, userType } = req.body;


   

    const alreadyExists = await User.findOne({ userEmail });

    if (alreadyExists) {
      const err = new Error("User already exists");
      err.statusCode = 400;
      throw err;
    }

   

    // Creating hashed passwords:
    const saltRounds = 11;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    const saltRoundsTwo = 11;
    const saltTwo = salt
    const hashedPasswordTwo = await bcrypt.hash(userPasswordTwo, saltTwo);

      if (hashedPassword !== hashedPasswordTwo) {
      const err = new Error("Password does not match");
      err.statusCode = 400;
      throw err;
    }


    const user = new User({
      userName,
      userEmail,
      userPassword: hashedPassword,
      userPasswordTwo: hashedPasswordTwo,
      userType,
    });

  
    const newUser = await user.save();
   
    

    res.status(201).send("User successfully added!");
  } catch (error) {
    next(error);
  }
};