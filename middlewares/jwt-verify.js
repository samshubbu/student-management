"use strict";

const config = require("../config/database");
const R = require("ramda");
const jwt = require("jsonwebtoken");

const checkNonAuthRoute = req => {
  const status = R.anyPass([
    (path, method) => method === "OPTIONS",
    (path, method) =>
      (path === "/users/register" || path === "/users/register/") &&
      method === "POST",
    (path, method) =>
      (path === "/users/login" || path === "/users/login/") &&
      method === "POST"
  ])(req.originalUrl, req.method);
  return status;
};

module.exports = (req, res, next) => {
  if (checkNonAuthRoute(req)) {
    return next();
  } else {
    const token = req.headers.authorization;
    if (token) {
      return verifyJWT(req, token)
        .then(user => {
          req.user = user;
          next();
        })
        .catch(() => {
          res.status(401).send({
            error: {
              error: true,
              message: "Authentication Problem"
            }
          });
        });
    } else {
      return res
        .status(401)
        .send({ error: true, message: "No token provided." });
    }
  }
};

const verifyJWT = (req, token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) reject({ error: true, message: "Token expired" });
      else resolve(decoded);
    });
  });
