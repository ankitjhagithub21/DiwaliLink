const express = require("express");
const { nanoid } = require("nanoid");
const Wish = require("../models/Wish");

const router = express.Router();

// Generate unique link
router.post("/create", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const slugBase = name.trim().toLowerCase().replace(/\s+/g, "-");
    const slug = `${slugBase}-${nanoid(5)}`;

    const newWish = new Wish({ name, slug });
    await newWish.save();

    const url = `${process.env.CLIENT_URL}/wish/${slug}`;
    res.json({ success: true, url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get wish by slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const wish = await Wish.findOne({ slug });

    if (!wish)
      return res.status(404).json({ success: false, message: "Wish not found" });

    res.json({ success: true, name: wish.name });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
