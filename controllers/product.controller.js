const auth = require("../middleware/auth");
const service = require('../services/role.service');
const util = require("../util/token");
const bcrypt = require("bcrypt");
const { User, validateUser, validateLogin, validateUserRole } = require("../models/user.model");
const express = require("express");
const router = express.Router();
const config = require('config')

router.post("/register", auth, async (req, res) => {
  
});

router.patch("/modify/:id", async (req, res) => {
  
});

router.delete("/delete/:id", async (req, res) => {
  
});

router.get("/list", auth, async (req, res) => {
  
});

router.get("/listById/:id", auth, async (req, res) => {
  
});

module.exports = router;