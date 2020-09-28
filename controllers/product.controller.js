const auth = require("../middleware/auth");
const service = require('../services/role.service');
const util = require("../util/token");
const bcrypt = require("bcrypt");
const { validateUser, validateLogin, validateUserRole } = require("../models/user.model");
const {Product} = require("../models/product.model")
const express = require("express");
const router = express.Router();
const config = require('config')

router.post("/register", auth, async (req, res) => {
  try {
    let product = new Product({
        productname: req.body.productname,
        amount: req.body.amount,
        description: req.body.description,
        price: req.body.price,
        creationdate: Date(),
    });
    let insert = await product.save();
    res.status(200).send(insert);
  } catch (error) {
    res.status(400).send(error)
  }
});

router.patch("/modify/:id", async (req, res) => {
  
});

router.put("/modifyAll/:id", async (req, res) => {
  try {
    let productPut = {
      _id: req.params.id,
      productname: req.body.productname,
      amount: req.body.amount,
      description: req.body.description,
      price: req.body.price,
      creationdate: Date(),
    };
  Product.put(productPut).then(product => {
      res.status(200).send(product);
    }).catch(err => {
      res.send('error: ' + err)
    })
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    Product.findByIdAndDelete({_id: req.params.id}).then(product => {
      res.status(200).send('Produto deletado do sistema');
    }).catch(err => {
      res.send('error: ' + err)
    })
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/list", auth, async (req, res) => {
  try {
    let products = await Product.find();
    if (!products){
        return res.status(400).send("Lista de produtos não encontrada.");
    } else {
        res.status(400).send(products);
    } 
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/listById/:id", auth, async (req, res) => {
  try {
    Product.findById({_id: req.params.id}).then(product => {
      res.status(200).send(product);
    }).catch(err => {
      res.send('error: ' + err)
    })
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;