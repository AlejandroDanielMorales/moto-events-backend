const Event = require("../models/Event");

const createEvent = async (req, res) => {
    try {
        const event = await Event.create({ 
            ...req.body, 
            createdBy: req.user.id 
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate("createdBy", "name");
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ADD STOP
const addStop = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);

        event.stops.push(req.body);
        await event.save();

        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// UPDATE STOP
const updateStop = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        const stop = event.stops.id(req.params.stopId);

        Object.assign(stop, req.body);
        await event.save();

        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE STOP
const deleteStop = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);

        event.stops.id(req.params.stopId).remove();
        await event.save();

        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    addStop,
    updateStop,
    deleteStop
};
