require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const { secret } = require("./secret");

// Sign-in token generation
const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      image: user.image,
      role: user.role, // Ensure the role is included
    },
    secret.token_secret,
    {
      expiresIn: "2d",
    }
  );
};

// Token for verification (e.g., for email verification)
const tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    secret.jwt_secret_for_verify,
    { expiresIn: "10m" }
  );
};

// Authentication middleware
const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({
      message: "Authorization token is missing or incorrectly formatted",
    });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret.token_secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

// Admin authorization middleware
const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).send({
        message: "User is not an admin",
      });
    }
    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
};
