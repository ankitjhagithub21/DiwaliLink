require('dotenv').config()
const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db');
const wishRoutes = require('./routes/wishRoutes');

const app = express()
const port = process.env.PORT || 8000


app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

connectDB()

app.use("/api/wish", wishRoutes);

app.get("/", (req, res) => {
  res.json({
    message:" Diwali Wishes API is running..."
  });
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
