import express from "express";
import BookingDetails from "../models/bookingDetails.js";

const router = express.Router();


// CREATE BOOKING
router.post("/book", async (req, res) => {
  try {
    const {
      pickup,
      dropoff,
      date,
      time,
      countryCode,
      phone,
      email,
      vehicleType,
    } = req.body;

    // validation
    if (!pickup || !dropoff || !date || !time || !countryCode || !vehicleType) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    if (!phone && !email) {
      return res.status(400).json({
        success: false,
        message: "Phone or Email is required",
      });
    }

    const booking = await BookingDetails.create({
      pickup,
      dropoff,
      date,
      time,
      contact: {
        countryCode,
        phone,
        email,
      },
      vehicleType,
    });

    res.status(201).json({
      success: true,
      message: "Booking saved successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// GET ALL BOOKINGS
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await BookingDetails.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;