
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Student = require('../models/Student');
const Company = require('../models/Company');
const { authMiddleware, isAdmin } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { role, page = 1, limit = 10, search } = req.query;
    
    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Count total users
    const total = await User.countDocuments(filter);
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Find users
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user is accessing their own profile or is an admin
    if (id !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to access this user' });
    }
    
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    
    if (user.role === 'student') {
      const { name, avatar, education, skills, experience, resume, bio } = req.body;
      
      // Update student fields
      if (name) user.name = name;
      if (avatar) user.avatar = avatar;
      if (education) user.education = education;
      if (skills) user.skills = skills;
      if (experience) user.experience = experience;
      if (resume) user.resume = resume;
      if (bio) user.bio = bio;
    } 
    else if (user.role === 'company') {
      const { name, description, location, industry, website, logo } = req.body;
      
      // Update company fields
      if (name) user.name = name;
      if (description) user.description = description;
      if (location) user.location = location;
      if (industry) user.industry = industry;
      if (website) user.website = website;
      if (logo) user.logo = logo;
    }
    
    user.updatedAt = Date.now();
    await user.save();
    
    // Return updated user without password
    const updatedUser = await User.findById(user._id).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change password
router.put('/password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Verify current password
    const isMatch = await req.user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    
    // Update password
    req.user.password = newPassword;
    await req.user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user (self or admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user is deleting themselves or is an admin
    if (id !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this user' });
    }
    
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await user.deleteOne();
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all companies (for public display)
router.get('/companies/list', async (req, res) => {
  try {
    const companies = await Company.find()
      .select('name location industry logo website')
      .sort({ name: 1 });
      
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
