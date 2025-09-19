require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

const clientRoutes = require("./routes/clients");
const chatbotRoutes = require("./routes/chatbot");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/clients", clientRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.get("/", (req, res) => res.send("Real Estate API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));