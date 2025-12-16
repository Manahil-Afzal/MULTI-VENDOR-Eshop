const express = require("express");
const Path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const {upload} = require("../multer");
const sendMail = require("../utils/sendMail");
const Seller = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendShopToken = require("../utils/shopToken");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const  cloudinary = require("../config/configure")


router.post("/create-shop", async (req, res, next) => {
  try {
     const { name, email, password, avatar, address, phoneNumber, zipCode } = req.body;
    const sellerEmail = await Seller.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("Shop already exists with this email", 400));
    }

    const myCloud = await cloudinary.uploader.upload(avatar, { folder: "avatars" });
    const seller = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address: address,
      phoneNumber: phoneNumber,
      zipCode: zipCode,
    };
    const activationToken = jwt.sign(
      seller,
      process.env.ACTIVATION_SECRET,
      { expiresIn: "300s" }
    );

    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;
       try {
           await sendMail({
             email: seller.email,
             subject: "Activate your account",
             message: `Hello ${seller.name}, please click on the link to activate your account ${activationUrl}`,
           });
           res.status(201).json({
             success: true,
             message: `please check your email: ${seller.email} to activate your account`,
           });
         } catch (error) {
           return next(new ErrorHandler(error.message, 500));
         }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// activate shop
// router.post(
//   "/shop-activation",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { activation_token } = req.body;
//       const newSeller = jwt.verify(
//         activation_token,
//         process.env.ACTIVATION_SECRET
//       );
   
//       if (!newSeller) {
//         return next(new ErrorHandler("Invalid token", 400));
//       }
//       const { name, email, password, avatar, zipCode, address, phoneNumber } =
//         newSeller;
//       let seller = await Shop.findOne({ email });
//       if (seller) {
//         return next(new ErrorHandler("User already exists", 400));
//       }
//       seller = await Shop.create({
//         name,
//         email,
//         avatar,
//         password,
//         zipCode,
//         address,
//         phoneNumber,
//       });
//       sendShopToken(seller, 201, res);
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

router.post(
  "/shop-activation",
  catchAsyncErrors(async (req, res, next) => {
    const { activation_token } = req.body;

    const newSeller = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET
    );

    if (!newSeller) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      newSeller;

    // Check if shop already exists
    let seller = await Seller.findOne({ email });

    if (seller) {
      return next(new ErrorHandler("User already exists", 400));
    }

    seller = await Seller({
      name,
      email,
      avatar,
      password,
      zipCode,
      address,
      phoneNumber,
    });
    // Send JWT cookie to user
    await seller.save();
    sendShopToken(seller, 201, res);
  })
);


//login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }
      const seller = await Seller.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("shop doesn't exists!", 400));
      }

      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

  })
);

// load shop
router.get(
  "/get-seller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const shop = await Seller.findById(req.seller._id);
    if (!shop) return next(new ErrorHandler("Shop not found", 400));

    res.status(200).json({ success: true, shop });
  })
);

//logout from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
       res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
        res.status(201).json({
        success: true,
        message: "Logout successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop info
router.get("/get-shop-info/:id", catchAsyncErrors(async(req,res,next) =>{
    try {
      const shop = await Seller.findById(req.params.id);
      res.status(201).json({
        success: true,
         shop,
    });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
}))

// update shop profile picture 
router.put(
  "/update-shop-avatar",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await Seller.findById(req.seller._id);

     await cloudinary.uploader.destroy(existsUser.avatar.public_id);

      const user = await Seller.findByIdAndUpdate(req.seller.activation_tokenId, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Seller.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all sellers --- for admin
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Seller.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller ---admin
router.delete(
  "/delete-seller/:id",
  isSeller,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Seller.findById(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandler("Seller is not available with this id", 400)
        );
      }

      await Seller.findByIdAndDelete(req.params.id);
      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // update seller withdraw methods --- sellers
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;
      const seller = await Seller.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // delete seller withdraw methods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Seller.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this id", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;



