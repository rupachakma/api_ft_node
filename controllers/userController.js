import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone } =
      req.body;
      if(!name || !email || !password || !address || !city || !country || !phone) {
        return res.status(500).send({
            success: false,
            message: "All fields required"
        })
      }
      
      //checking if any existing user
      const existingUser = await userModel.findOne({ email })
      if (existingUser) return res.status(500).send({
        success: false,
        message: 'Email already taken!'
      })

      const user = await userModel.create({
        name,
        email, 
        password, 
        address, 
        city, 
        country, 
        phone
      })
      
      res.status(201).send({
        success: true,
        message: "Registration successful",
        user
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};


//login controller

export const loginController = async (req, res) => {
  try {
    const {email, password} = req.body
    //validate credentials
    if(!email || !password) return res.status(500).send({
      success: false,
      message: 'Please enter your email and password'
    })

    //check if user exists
    const user = await userModel.findOne({email})
    if(!user) return res.status(500).send({
      success: false,
      message: 'User not found'
    });

    // check password
    const isMatch = await user.comparePassword(password)
    //validate credentials
    if(!isMatch) return res.status(500).send({
      success: false,
      message: 'Invalid credentials'
    })

    //token
    const token = user.generateToken();

    res.status(200).cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }).send({
      success: true,
      message: 'Login successful',
      token,
      user
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in login",
      error
    })
  }
}