const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const Event = require("../model/event");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const { isSeller,  isAuthenticated, isAdmin } = require("../middleware/auth");
const cloudinary = require("cloudinary");
const event = require("../model/event");

// create Event
router.post(
  "/create-event",
   upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
      console.log("Backend route hit"); 
    try {
      const shopId = req.body.shopId;
      console.log("ShopId received:", shopId, "Type:", typeof shopId);
      const shop = await Shop.findById(shopId);
      console.log("Shop found:", shop);

      if (!shop) {
        return next(new ErrorHandler("ShopId is invalid!, 400"));
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

        const event = await Event.create(productData);
        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all events
router.get(
  "/get-all-event-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    const events = await Event.find({ shopId: req.params.id });
    res.status(200).json({
      success: true,
      events,
    });
  })
);

// get all events 
router.get(
  "/get-all-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find(); 
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete events of a shop
router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const eventData = await Event.findById(eventId);
      if (!eventData) {
        return next(new ErrorHandler("Event not found with this id!", 404));
      }
      eventData.images.forEach((imageUrl) => {
        const filePath = `uploads/${imageUrl}`;
        fs.unlink(filePath, (err) => {
          if (err) console.log(err);
        });
      });
      // Delete event from DB
      await Event.findByIdAndDelete(eventId);
      res.status(200).json({
        success: true,
        message: "Event deleted successfully!",
      });
    } catch (error) {
      return next(
        new ErrorHandler(error.message || "Error deleting event", 500)
      );
    }
  })
);


// all events --- for admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
 