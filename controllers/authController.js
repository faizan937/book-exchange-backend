const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const UserDTO = require("../dto/user");
const JWTService = require("../service/JWTservices");

const passwordPattern = /^\d{8,25}$/;

const authController = {
  async register(req, res, next) {
    // 1. Validate user input
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = userRegisterSchema.validate(req.body);

    // 2. If validation error, return error via middleware
    if (error) {
      return next(error);
    }

    // 3. Check if email or username is already registered
    const { username, name, email, password } = req.body;

    try {
      const emailInUse = await User.exists({ email });
      const usernameInUse = await User.exists({ username });

      if (emailInUse) {
        return next({
          status: 409,
          message: "Email already registered, use another email!",
        });
      }

      if (usernameInUse) {
        return next({
          status: 409,
          message: "Username not available, choose another username!",
        });
      }
    } catch (error) {
      return next(error);
    }

    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Store user data in the database
    const userToRegister = new User({
      username,
      email,
      name,
      password: hashedPassword,
    });

    let user, accessToken, refreshToken;


    try {
      user = await userToRegister.save();

      // Token generation
      accessToken = JWTService.signAccessToken( { _id: user._id,email: user.email },"30m" );
      refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");

      // Store refresh token in the database
      await JWTService.storeRefreshToken(refreshToken, user._id);

      // Send tokens in cookie
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
      });

      // 6. Send response
      const userDto = new UserDTO(user);
      return res.status(201).json({ user: userDto });
    } catch (error) {
      return next(error);
    }
  },

  async login(req, res, next) {
    // 1. Validate user input
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
    });

    const { error } = schema.validate(req.body);

    // 2. If validation error, return error
    if (error) {
      return next(error);
    }

    const { email, password } = req.body;
    let user;

    try {
      // 3. Match email
      user = await User.findOne({ email });

      if (!user) {
        return next({
          status: 401,
          message: "Invalid username or password",
        });
      }

      // 4. Match password
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return next({
          status: 401,
          message: "Invalid password",
        });
      }

      // Send user data
      const userDto = new UserDTO(user);
      return res.status(200).json({ user: userDto });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = authController;