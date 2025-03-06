var express = require('express');
const { ConnectionCheckOutFailedEvent } = require('mongodb');
var router = express.Router();
let productModel = require('../schemas/product')

router.get('/', async function(req, res, next) {
  let products = await productModel.find({});
  res.status(200).send({
    success:true,
    data:products
  });
});

router.post('/', async function(req, res) {
  try {
    let newProduct = new productModel({
      name: req.body.name,
      price:req.body.price,
      quantity: req.body.quantity,
      category:req.body.category
    })
    await newProduct.save();
    res.status(200).send({
      success:true,
      data:newProduct
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:error.message
    });
  }
});


router.delete('/:id', async function (req, res) {
  try {
      const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
      
      if (!deletedProduct) {
          return res.status(404).send({
              success: false,
              message: "Sản phẩm không tồn tại!"
          });
      }

      res.status(200).send({
          success: true,
          message: "Xóa sản phẩm thành công!",
          data: deletedProduct
      });
  } catch (error) {
      res.status(500).send({
          success: false,
          message: error.message
      });
  }
});


router.put('/:id', async function (req, res) {
  try {
      const updatedProduct = await productModel.findByIdAndUpdate(
          req.params.id,  
          {
              name: req.body.name,
              price: req.body.price,
              quantity: req.body.quantity,
              category: req.body.category
          },
          { new: true, runValidators: true } 
      );

      if (!updatedProduct) {
          return res.status(404).send({
              success: false,
              message: "Sản phẩm không tồn tại!"
          });
      }

      res.status(200).send({
          success: true,
          message: "Cập nhật sản phẩm thành công!",
          data: updatedProduct
      });
  } catch (error) {
      res.status(500).send({
          success: false,
          message: error.message
      });
  }
});


module.exports = router;
