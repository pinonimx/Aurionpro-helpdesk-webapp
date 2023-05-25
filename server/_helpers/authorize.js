const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = authorize;

function authorize(roles = []) {
    
  return (req, res, next) => {
    // Retrieve the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // Verify the JWT token with the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Authorize based on user role
      if (roles.length && !roles.includes(req.user.role)) {
        // User's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // Authentication and authorization successful
      next();
    } catch (err) {
        console.log(err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}