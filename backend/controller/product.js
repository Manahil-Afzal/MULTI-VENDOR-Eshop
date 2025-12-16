const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const fs = require("fs");
const Order = require("../model/order"); 
const cloudinary = require("../config/configure");

// // create product
// router.post(
//   "/create-product",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const shopId = req.body.shopId;
//       const shop = await Shop.findById(shopId);

//       if (!shop) {
//         return next(new ErrorHandler("ShopId is invalid!, 400"));
//       } else {
      
//         let images = [];
//         if (typeof req.body.images === "string") {
//           images.push(req.body.images);
//         } else {
//           images = req.body.images;
//         }
      
//         const imagesLinks = [];
      
//         for (let i = 0; i < images.length; i++) {
//           const result = await cloudinary.uploader.upload(images[i], {
//             folder: "products",
//           });
      
//           imagesLinks.push({
//             public_id: result.public_id,
//             url: result.secure_url,
//           });
//         }
//         const productData = req.body;
//         productData.images = imagesLinks;
//         productData.shop = shop;
//         const product = await Product.create(productData);

//         res.status(201).json({
//           success: true,
//           product,
//         });
//       }
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );


router.post(
  "/create-product",
    upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      console.log("Received shopId:", req.body.shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid", 400));
      } else {
        let images = [];
        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }
        const imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i], {
            folder: "products",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        const productData = req.body;

        productData.images = imagesLinks;
        productData.shop = shop;

        const product = await Product.create(productData);
        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all products
router.get(
  "/get-all-product-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find({ shopId: req.params.id }); 
    if (!products) {
      return next(new ErrorHandler("No products found for this shop", 404));
    }
    res.status(200).json({
      success: true,
      products,
    });
  })
);


// delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }    

    for (let i = 0; i < product.images.length; i++) {
  await cloudinary.uploader.destroy(product.images[i].public_id);
}

    
       await Product.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;
      const product = await Product.findById(productId);
      const review = {
        user,
        rating,
        comment, 
        productId, 
      };
      const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      );
      if (isReviewed) {
        (isReviewed.rating = rating), (isReviewed.comment = comment), (isReviewed.user = user);  
      } else {
        product.reviews.push(review);
      }
       const totalRatings = product.reviews.reduce((acc, rev) => acc+rev.rating,0)
      product.ratings = totalRatings / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
  orderId,
  { $set: { "cart.$[elem].isReviewed": true } },
  { arrayFilters: [{ "elem._id": productId }], new: true }
);


      res.status(200).json({
        success: true,   
        message: "Reviewed successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;
