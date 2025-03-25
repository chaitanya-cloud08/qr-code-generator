import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  const generateQrCode = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    try {
      const response = await axios.post("https://qr-code-backend-blond.vercel.app/generate", { url });
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error("Error generating QR Code", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-80 px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={generateQrCode}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
      >
        Generate QR Code
      </button>
      {qrCode && (
        <img src={qrCode} alt="QR Code" className="mt-6 w-48 h-48 border border-gray-300 rounded-lg" />
      )}
    </div>
  );
}

export default App;
