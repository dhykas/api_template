const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (token == null) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, "139ui&^*&$(^19eu1me0q2hdh8*&^*%^*dd", (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden',err });
    }

    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken
};
