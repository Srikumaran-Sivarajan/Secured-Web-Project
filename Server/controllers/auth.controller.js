import User from "../models/user.model..js";
import asyncWrapperFunction from "../utils/asyncWrapperFunction.js";
import AppError from "../utils/Exceptions.js";
import { jwtToken, jwtTokenVerify } from "../utils/jwtToken.js";

export async function signInUser(req, res, next) {
  try {
    const { username, email, password } = req.body;

    
    if (!username || !email || !password) {
      throw new Error("All feilds required");
    }

    // 2️⃣ Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 3️⃣ Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // 4️⃣ Send success response
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    // 5️⃣ Forward to global error handler
    console.log(error.message);
    next(error);
  }
}


export const logInUser = asyncWrapperFunction(async(req, res, next) => {
  const {email, password} = req.body;

  if(!email || !password) throw new AppError("All feilds are required", 400 );

  const user = await User.findOne({email});

  if(!user) throw new AppError("Email not Avialable",404 );

  if(!user.comparePassword(password)) throw new AppError("Invalid Credentials", 401);

  const refreshToken = await jwtToken({
    id:user._id,
    name:user.name,
    role:user.role
  }, false);

  const accessToken = await jwtToken({
    id:user._id,
    name:user.name,
    role:user.role
  }, true);


  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, 
    sameSite: "strict",
    path: "/",
    maxAge: 1 * 24 * 60 * 60 * 1000, 
  });

  res.status(200).json({ accessToken });
});


export const getAccessToken = asyncWrapperFunction(async (req, res, next) => {
  const refreshToken = req?.cookies?.refreshToken;
  
//  console.log(refreshToken);
  const data = await jwtTokenVerify(refreshToken);

  if(!data) throw new AppError("Invalid Cretentials", 401);

  const accessToken = await jwtToken(data, true);

  res.status(200).json({ accessToken });

})
