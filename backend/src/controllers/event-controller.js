import { events } from "../data/events.js";

export function getEvents(req, res) {
  res.json(events);
}

export function getEventById(req, res) {
  res.json({});
}

export function createEvent(req, res) {
  res.status(201).json({});
}