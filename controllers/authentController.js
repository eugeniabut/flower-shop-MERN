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

export const passwordChangeHandler=async(req,res,next)=>{

  try{
      const userId =req.params.id
  const {email,currentPassword, confirmPassword, newPassword} = req.body
  
  if(confirmPassword !== newPassword) return res.status(400).send("Invalid Credentials")

  const userRecord = await User.findById(userId)
  if(userRecord === null) return res.status(401).send("Invalid Credentials, Record not found")

  const isValid = await bcrypt.compare(currentPassword, userRecord.password)

  if(!isValid) return res.status(401).send("Invalid Credentials")

  const salt = await bcrypt.genSalt(11)
  const newHashedPassword = await bcrypt.hash(newPassword, salt)

  const result = await User.findByIdAndUpdate(userId, {password:newHashedPassword})

  res.status(202).send("Password Changed Successfully")
  }
  catch(err){
      res.status(401).send("Something went wrong...! ")
  }

}