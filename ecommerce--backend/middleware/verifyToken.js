const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { secret } = require("../config/secret");

module.exports = async (req, res, next) => {
  try {
    // Check if the Authorization header exists and extract the token
    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in"
      });
    }

    // Verify the token and decode it
    const decoded = await promisify(jwt.verify)(token, secret.token_secret);
    
    // Attach the decoded user to the request object
    req.user = decoded;

    // Check if the user is an admin
    if (req.user.role !== 'Admin') {
      return res.status(403).json({
        status: "fail",
        error: "You do not have permission to access this resource"
      });
    }

    // Allow the request to proceed if the user is an admin
    next();

  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "Invalid token"
    });
  }
};
