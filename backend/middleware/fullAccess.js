// if the role is moderator or administrator, the access is full

module.exports =
  (...roles) =>
  (req, res, next) => {
    // check the role
    const isAuthorized = roles.includes(req.auth.role);
    req.auth.isAuthorized = isAuthorized;
    next();
  };
