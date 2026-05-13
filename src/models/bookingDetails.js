import mongoose from "mongoose";

const bookingDetailsSchema = new mongoose.Schema(
  {
    pickup: {
      type: String,
      required: true,
    },

    dropoff: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    contact: {
      countryCode: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        default: "",
      },

      email: {
        type: String,
        default: "",
      },
    },

    vehicleType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookingDetails = mongoose.model("BookingDetails", bookingDetailsSchema);

export default BookingDetails;