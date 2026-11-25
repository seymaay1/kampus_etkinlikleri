import "dotenv/config";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { Event } from "./models/event-model.js";
import { seedEvents } from "./data/seed-events.js";

await connectDatabase();
await Event.deleteMany({});
const created = await Event.insertMany(seedEvents);
console.log(`${created.length} etkinlik eklendi`);
await mongoose.disconnect();