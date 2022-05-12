import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
const SECRET_KEY = "123";

/**
 * Creation of a User
 * @param {*} email
 * @param {*} password
 * @param {*} role
 * @returns
 */
export const createUser = (name, emailId, password, role) => {
  const user = User.create({
    name,
    emailId,
    password,
    role,
  });
  return user;
};

/**
 * Get User
 * @param {*} emailId
 * @returns
 */
export const userExists = (emailId) => {
  return User.findOne({ emailId });
};

/**
 * Token Generation
 * @param {*} id
 * @returns
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: "30d",
  });
};

// search for a user item by query
export const search = (query) => {
  const params = { ...query };
  // will be an array of promise
  return User.find(params).exec();
};