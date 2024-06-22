const UserModel = require("../models/userdata");
const jwtUtils = require('../utils/jwtUtils');
const bcrypt = require('bcrypt');

// crear y salvar un nuevo usuario
const createuser = async (req, res) => {
  const { email, firstName, lastName, phone, username, password } = req.body;

  if (!email || !firstName || !lastName || !phone || !username || !password) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      email,
      firstName,
      lastName,
      phone,
      username,
      password: hashedPassword,
    });

    const data = await user.save();
    res.status(201).send({
      message: "User created successfully!",
      user: data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
};

// Todos los usuarios
const getusers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar un usuario en especifico
const getspecuser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// actualizar un usuario por ID
const updateuser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Eliminar un usuario por ID
const deleteuser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Acceso al login usuario
const loginuser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwtUtils.generateToken({
      id: user._id,
      username: user.username,
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getusers,
  createuser,
  getspecuser,
  updateuser,
  deleteuser,
  loginuser,
};
