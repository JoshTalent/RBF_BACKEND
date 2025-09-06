// routes/eventsRoute.js
import express from "express";
import Event from "../models/eventsModel.js"; // your Event model
// import authorizeAdmin from "../middlewares/authentication.js"; // uncomment if you have auth middleware

const router = express.Router();

// --- TEST ROUTE ---
router.get("/msg", (req, res) => {
  res.json({ message: "hello world" });
});
 
// --- CREATE EVENT ---
router.post("/", async (req, res) => {
  try {
    const { title, location, date, description } = req.body;

    const newEvent = new Event({ title, location, date, description });
    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GET ALL EVENTS ---
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GET SINGLE EVENT BY ID ---
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- UPDATE EVENT ---
router.put("/:id", async (req, res) => {
  try {
    const { title, location, date, description } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, location, date, description },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) return res.status(404).json({ error: "Event not found" });

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- DELETE EVENT ---
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ error: "Event not found" });

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
