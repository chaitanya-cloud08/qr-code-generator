const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors({
    origin: "*",
    methods: "GET,POST",
    allowedHeaders: ["Content-Type"],
    credentials: true
  }));
  app.use(express.json());

app.post("/generate", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        const qrCodeData = await QRCode.toDataURL(url);
        res.json({ qrCode: qrCodeData });
    } catch (err) {
        res.status(500).json({ error: "Failed to generate QR Code" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
