import cloudinary from '../config/cloudinary.js';
import { YogaClass } from '../models/Yoga.model.js';
import mongoose from 'mongoose';
import fs from 'fs';

export const createClass = async (req, res) => {
    try {
        const newClass = new YogaClass(req.body);
        const savedClass = await newClass.save();
        res.status(201).json({ success: true, data: savedClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllClasses = async (req, res) => {
    try {
        const filters = req.query || {};
        const classes = await YogaClass.find(filters)
            .populate('instructor', 'firstName lastName');
        res.status(200).json({ success: true, data: classes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getClassById = async (req, res) => {
    try {
        const { id } = req.params;
        const yogaClass = await YogaClass.findById(id).populate(
            'instructor',
            'firstName lastName'
        );
        if (!yogaClass) {
            return res
                .status(404)
                .json({ success: false, message: 'Class not found' });
        }
        res.status(200).json({ success: true, data: yogaClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedClass = await YogaClass.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedClass) {
            return res
                .status(404)
                .json({ success: false, message: 'Class not found' });
        }
        res.status(200).json({ success: true, data: updatedClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClass = await YogaClass.findByIdAndDelete(id);
        if (!deletedClass) {
            return res
                .status(404)
                .json({ success: false, message: 'Class not found' });
        }
        res.status(200).json({ success: true, message: 'Class deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const uploadVideo = async (req, res) => {
    try {
        const { classId } = req.params;
        const { file } = req;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No video file uploaded'
            });
        }

        const yogaClass = await YogaClass.findById(classId);
        if (!yogaClass) {
            return res.status(404).json({
                success: false,
                message: 'Class not found'
            });
        }

        // Store the Cloudinary URL instead of file path
        yogaClass.videoUrls.push(file.path);
        await yogaClass.save();

        res.status(200).json({
            success: true,
            data: yogaClass,
            videoUrl: file.path
        });
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading video to Cloudinary'
        });
    }
};