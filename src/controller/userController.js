const userSchema = require("../model/model");
const createPassword = require("../helper");
const bcrypt = require("bcrypt");
// const loginSchema = require('../model/loginSchema')
module.exports = {
  createUser: async (req, res) => {
    try {
      const password = await createPassword(req.body.password);
      let userData = {
        username: req.body.username,
        age: req.body.age,
        password: password,
      };
      const createUser = await userSchema.create(userData);
      console.log(createPassword);
      return res.status(200).send({
        message: "User created Successfully",
        status: true,
        data: createUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({
        message: "Please enter all details",
        status: false,
      });
    }
  },
  getSingleUser: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const findById = await userSchema.findById(id);
      return res.send({
        message: "User Found Sucessfully",
        status: true,
        data: findById,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getAllData: async (req, res) => {
    try {
      const getUser = await userSchema.find({});
      if (!getUser) {
        return res.status(404).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "User Found Sucessfully",
          status: true,
          data: getUser,
        });
      }
    } catch (error) {
      return res.status(404).send({
        message: "Something Went Wrong",
        status: false,
        error: error,
      });
    }
  },
  loginUser: async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const findByuser = await userSchema.findOne({ username: username });
      const storedPassword = await findByuser.password;
      const conformPassword = await bcrypt.compare(password, storedPassword);
      console.log(conformPassword);
      if(conformPassword){
        res.status(200).send({
            message: "Login Successful",
            status: true,
            data: findByuser,
          });
      }
    
    } catch (error) {
      console.log(error);
      res.status(401).send({
        message: "Un Authorized",
        status: false,
      });
    }
  },
};
