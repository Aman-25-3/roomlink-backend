const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        area: {
    type: String,
    required: true,
},

furnished: {
    type: String,
    enum: [
        "Furnished",
        "Semi Furnished",
        "Unfurnished",
    ],
    required: true,
},

        address: {
            type: String,
            required: true,
        },
       
        roomType: {
    type: String,
    enum: [
        "Boys",
        "Girls",
        "Family",
    ],
    required: true,
},

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        images: [
            {
                type: String,
            },
        ],

        available: {
            type: Boolean,
            default: true,
        },

        location: {
  lat: {
    type: Number,
    default: 22.7196,
  },
  lng: {
    type: Number,
    default: 75.8577,
  },
},
    },
    {
        timestamps: true,
    }
   
);



module.exports = mongoose.model("Room", roomSchema);