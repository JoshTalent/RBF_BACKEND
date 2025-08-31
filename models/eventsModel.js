// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
 
export default Event;
 