const { Schema, model } = require("mongoose");

const SkillSchema = new Schema({
    name: {
        type: String
    }
});

const PetSchema = new Schema({
    name: {
        type: String,
        required: [true, "The Pet name is required"],
        minLength: [3, "Pet name must be at least 3 characters"],
        trim: true
    },
    type: {
        type: String,
        required: [true, "The Pet type is required"],
        minLength: [3, "Pet type must be at least 3 characters"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "The Pet description is required"],
        minLength: [3, "Pet description must be at least 3 characters"],
        trim: true
    },
    skills: [SkillSchema],
    likes:{
        type: Number
    }
});

module.exports = model("Pet", PetSchema);