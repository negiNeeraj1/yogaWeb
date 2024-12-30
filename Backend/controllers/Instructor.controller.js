import Instructor from "../models/instructor.model.js";

export const getAllInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInstructorById = async (req, res) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        res.status(200).json(instructor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createInstructor = async (req, res) => {
    const instructor = new Instructor(req.body);
    try {
        const newInstructor = await instructor.save();
        res.status(201).json(newInstructor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateInstructor = async (req, res) => {
    try {
        const updatedInstructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInstructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        res.status(200).json(updatedInstructor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteInstructor = async (req, res) => {
    try {
        const deletedInstructor = await Instructor.findByIdAndDelete(req.params.id);
        if (!deletedInstructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        res.status(200).json({ message: 'Instructor deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};