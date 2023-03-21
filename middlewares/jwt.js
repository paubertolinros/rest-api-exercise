const { expressjwt: jwt } = require('express-jwt');

function getTokenFromHeaders(req) {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === 'Bearer') {
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }
  return null;
}

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders
});

// const isAdmin = (req, res, next) => {
//   if (req.payload.role === 'admin') {
//     next()
//   } else {
//     res.status(401).json({ message: 'User is not admin' })
//     return;
//   }
// }

module.exports = {
  isAuthenticated
}