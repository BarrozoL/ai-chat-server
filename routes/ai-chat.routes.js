const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const Message = require("../models/Message.model");
require("dotenv").config();

// Initialize OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/ai-chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      // Use a valid model name; for testing, "gpt-3.5-turbo" is reliable.
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    // Depending on your library version, the response may be wrapped in a "data" property.
    const result = response.data || response;

    if (result && Array.isArray(result.choices) && result.choices.length > 0) {
      const userMessage = new Message({ sender: "user", content: message });
      await userMessage.save();

      const aiMessage = new Message({
        sender: "ai",
        content: result.choices[0].message.content,
      });
      await aiMessage.save();

      res.json({ reply: result.choices[0].message.content });
    } else {
      res
        .status(500)
        .json({ error: "Unexpected API response structure", result });
    }
  } catch (error) {
    console.log("Error calling OpenAI API:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/ai-chat", (req, res) => {
  res.json("GPT endpoint is working");
});

module.exports = router;
