import mongoose from "mongoose";

const excomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  facebook: { type: String, required: true },
  instagram: { type: String, required: true },
  twitter: { type: String, required: true },
});

const excomeModel = mongoose.model("excome", excomeSchema);

export default excomeModel;
