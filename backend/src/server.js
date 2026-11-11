import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error("Sunucu başlatılamadı:", error.message);
    process.exit(1);
  }
  console.log(`API: http://localhost:${PORT}`);
});