import mongoose from "mongoose";

const judgeSchema = new mongoose.Schema({   
    name: { type: String, required: true },
    country: { type: String, required: true },
    experience: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    image: { type: String, required: true },

});

const judgeModel = mongoose.model("judge", judgeSchema);

export default judgeModel
 