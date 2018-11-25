const AccessList = require("../models/accesslist");

const removeSlashes = str => {
  let newStr = str;
  while (true) {
    if (newStr[newStr.length - 1] == "/") {
      newStr = newStr.slice(0, -1);
    } else {
      break;
    }
  }
  return newStr;
};
module.exports = (req, res, next) => {
  AccessList.findOne({
    routepath: removeSlashes(req.originalUrl),
    method: req.method
  })
    .exec()
    .then(accessList => {
      if (!accessList) {
        next();
        return;
      }
      console.log(req.user);
      if (
        !req.user.roles.includes(accessList.rolename) &&
        !req.user.roles.includes("ADMIN")
      ) {
        res.status(401).send({ message: "Not authorised" });
        return;
      }
      next();
    });
};
