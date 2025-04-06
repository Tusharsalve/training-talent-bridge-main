
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');
const { authMiddleware, isCompany, isAdmin } = require('../middleware/auth');
const mongoose = require('mongoose');

// Get all jobs with filters
router.get('/', async (req, res) => {
  try {
    const { 
      title, 
      location, 
      type, 
      companyId, 
      status = 'Open',
      skills,
      page = 1,
      limit = 10
    } = req.query;
    
    // Build filter object
    const filter = { status };
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (type) filter.type = type;
    if (companyId) filter.company = companyId;
    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim());
      filter.skills = { $in: skillsArray };
    }
    
    // Count total matching documents
    const total = await Job.countDocuments(filter);
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Find jobs
    const jobs = await Job.find(filter)
      .populate('company', 'name location logo')
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    res.json({
      jobs,
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

// Get job by id
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', 'name description location website logo');
      
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new job (companies only)
router.post('/', authMiddleware, isCompany, async (req, res) => {
  try {
    const { 
      title, location, type, description,
      requirements, skills, salary, deadline
    } = req.body;
    
    const newJob = new Job({
      title,
      company: req.user._id,
      location,
      type, 
      description,
      requirements,
      skills,
      salary,
      deadline
    });
    
    await newJob.save();
    
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update job (company owner or admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    // Check if user is job owner or admin
    if (job.company.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this job' });
    }
    
    const {
      title, location, type, description,
      requirements, skills, salary, deadline, status
    } = req.body;
    
    // Update job fields
    if (title) job.title = title;
    if (location) job.location = location;
    if (type) job.type = type;
    if (description) job.description = description;
    if (requirements) job.requirements = requirements;
    if (skills) job.skills = skills;
    if (salary) job.salary = salary;
    if (deadline) job.deadline = deadline;
    if (status) job.status = status;
    
    job.updatedAt = Date.now();
    
    await job.save();
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete job (company owner or admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    // Check if user is job owner or admin
    if (job.company.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this job' });
    }
    
    // Delete all applications for this job
    await Application.deleteMany({ job: job._id });
    
    // Delete the job
    await job.deleteOne();
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get jobs for specific company
router.get('/company/:companyId', async (req, res) => {
  try {
    const { companyId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ error: 'Invalid company ID' });
    }
    
    const jobs = await Job.find({ company: companyId })
      .sort({ postedDate: -1 });
      
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
