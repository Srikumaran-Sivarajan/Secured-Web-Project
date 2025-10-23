import User from "../models/user.model..js";

export async function signInUser(req, res, next) {
  try {
    const { username, email, password } = req.body;

    // 1️⃣ Validate input
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


export async function logInUser(req, res, next){
  try{

  } catch(err){

  }
}
