
module.exports = {
  isLoggedIn : (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({result:false});
    }
  },
  isNotLoggedIn : (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      console.log('logout plz ^ g ^');
      res.status(401);
    }
  }
}