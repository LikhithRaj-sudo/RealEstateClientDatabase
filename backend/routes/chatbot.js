const express = require("express");
const router = express.Router();

const faqs = [
  { keywords: ["rate", "price"], answer: "Average property rate: ₹5,000 per sq.ft." },
  { keywords: ["loan", "interest"], answer: "Home loan rates start from 8.5%." },
  { keywords: ["trend", "market"], answer: "Market trend: 10% growth this year." }
];

router.post("/", (req, res) => {
  const question = (req.body.question || "").toLowerCase();
  if (!question) return res.status(400).json({ answer: "Please ask a valid question." });

  const found = faqs.find(f => f.keywords.some(k => question.includes(k)));
  if (found) return res.json({ answer: found.answer });

  res.json({ answer: "Sorry, I don’t have info on that. Try: 'property rates', 'loan options', or 'market trend'." });
});

module.exports = router;