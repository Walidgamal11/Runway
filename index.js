import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-video", async (req, res) => {
  try {
    const { image_url, prompt } = req.body;

    const response = await fetch(
      "https://api.runwayml.com/v1/image_to_video",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RUNWAY_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gen-4-turbo",
          image: image_url,
          prompt,
          duration: 4
        })
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Runway API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
