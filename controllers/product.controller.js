const auth = require("../middleware/auth");
const service = require('../services/role.service');
const util = require("../util/token");
const userController = require("../controllers/user.controller");
const bcrypt = require("bcrypt");
const { validateUser, validateLogin, validateUserRole } = require("../models/user.model");
const {Product} = require("../models/product.model")
const express = require("express");
const router = express.Router();
const config = require('config')

function normalizeRBAC(rbac) {
  let roles = rbac.filter(p => p.product == config.get("product"));
  if (roles) {
    roles = roles.map(r => r.roles);
  }
  return roles;
}

router.post("/register", auth, async (req, res) => {
  try {
    const _service = new service();
    await _service.setRole();

    let roles = normalizeRBAC(req.user.rbac); 
    let resurce = req.path.replace('/', '').split('/').shift(); 
    let action = "read"; 
    let context = JSON.parse(req.headers['x-api-context']); 
    let atrributes = [req.params.atrributes]; 

    let _grant = await _service.grant(roles, action, context, resurce, atrributes);
    if(_grant){
      let product = new Product({
          productname: req.body.productname,
          amount: req.body.amount,
          description: req.body.description,
          price: req.body.price,
          creationdate: Date(),
      });
      let insert = await product.save();
      res.status(200).send(insert);
    } else {
      res.status(400).send({error:'Access denied'});
    }
    
  } catch (error) {
    res.status(400).send(error)
  }
});

router.put("/modify/:id", async (req, res) => {
  try {
    const _service = new service();
    await _service.setRole();

    let roles = normalizeRBAC(req.user.rbac); 
    let resurce = req.path.replace('/', '').split('/').shift(); 
    let action = "read"; 
    let context = JSON.parse(req.headers['x-api-context']); 
    let atrributes = [req.params.atrributes]; 

    let _grant = await _service.grant(roles, action, context, resurce, atrributes);
    if(_grant){
      Product.findByIdAndUpdate({_id: req.params.id}, req.body).then(product => {
        Product.findById({_id: req.params.id}).then(product =>{
          res.status(200).send(product);
        }).catch(err => {
          res.status(400).send(error);
        })
      }).catch(err => {
        res.send('error: ' + err)
      })
    } else{
      res.status(400).send({error:'Access denied'});
    }
  } catch (error) {
    res.status(400).send(error);
  }  
});

router.patch("/modify/:id", async (req, res) => {
  try {
    const _service = new service();
    await _service.setRole();

    let roles = normalizeRBAC(req.user.rbac); 
    let resurce = req.path.replace('/', '').split('/').shift(); 
    let action = "read"; 
    let context = JSON.parse(req.headers['x-api-context']); 
    let atrributes = [req.params.atrributes]; 

    let _grant = await _service.grant(roles, action, context, resurce, atrributes);
    if(_grant){
      Product.findByIdAndUpdate(req.params.todoId,req.body,{new: true}).then(product => {
        res.status(200).send(product);
      }).catch(err => {
        res.send('error: ' + err)
      })
    } else {
      res.status(400).send({error:'Access denied'});
    }
    
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const _service = new service();
    await _service.setRole();

    let roles = normalizeRBAC(req.user.rbac); 
    let resurce = req.path.replace('/', '').split('/').shift(); 
    let action = "read"; 
    let context = JSON.parse(req.headers['x-api-context']); 
    let atrributes = [req.params.atrributes]; 

    let _grant = await _service.grant(roles, action, context, resurce, atrributes);
    if(_grant){
      Product.findByIdAndDelete({_id: req.params.id}).then(product => {
        res.status(200).send('Product successfully deleted');
      }).catch(err => {
        res.send('error: ' + err)
      })
    } else {
      res.status(400).send({error:'Access denied'});
    }
    
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/list", auth, async (req, res) => {
  try {
    const _service = new service();
    await _service.setRole();

    let roles = normalizeRBAC(req.user.rbac); 
    let resurce = req.path.replace('/', '').split('/').shift(); 
    let action = "read"; 
    let context = JSON.parse(req.headers['x-api-context']); 
    let atrributes = [req.params.atrributes]; 

    let _grant = await _service.grant(roles, action, context, resurce, atrributes);

    if(_grant){
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      let products = await Product.find().skip(skip).limit(limit);
      if (products == null){
          return res.status(400).send({error: 'error'});
      } else {
          res.status(200).send({status: 'success', products});
      }
    } else {
      res.status(400).send({error:'Access denied'});
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