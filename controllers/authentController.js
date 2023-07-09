import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const loginHandler = async (req, res, next) => {
  try {
    const { userName, userPassword } = req.body; //get  data from frontend

    const userDataFromDB = await User.findOne(   //get data from database
      { userName}  
    );                                 

    if (userDataFromDB === null) {
      const err = new Error("Invalid Credentials!")
      err.statusCode = 400
      throw err
      
    }

    const hashedPassword = userDataFromDB.userPassword; //get hashed password from database

    const isValid = await bcrypt.compare(userPassword, hashedPassword); //compare password and hashed password

  

    if (!isValid) {
      const err = new Error("Invalid Credentials!")
      err.statusCode = 400
      throw err
    }
    
    else{                                        //if password===hashedPassword=>generate token
      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

      const payload = {
        userName :userDataFromDB.userName,
        userEmail:userDataFromDB.userEmail,
        userId: userDataFromDB._id,
        userType:userDataFromDB.userType
      };

      const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 36000 });

      res.status(201).json({
        message: "logged in successfully",
        token: token,
        userName: userDataFromDB.userName,
        userId: userDataFromDB._id,
      });
    
    }
  } catch (err) {
    next(err);
  }
};

