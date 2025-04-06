
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const { authMiddleware, isStudent, isCompany } = require('../middleware/auth');

// Get applications for current user (based on role)
router.get('/', authMiddleware, async (req, res) => {
  try {
    let applications;
    
    if (req.user.role === 'student') {
      // If student, get their applications
      applications = await Application.find({ student: req.user._id })
        .populate({
          path: 'job',
          select: 'title company location type status',
          populate: {
            path: 'company',
            select: 'name logo'
          }
        })
        .sort({ appliedDate: -1 });
    } else if (req.user.role === 'company') {
      // If company, get applications for their jobs
      const companyJobs = await Job.find({ company: req.user._id }, '_id');
      const jobIds = companyJobs.map(job => job._id);
      
      applications = await Application.find({ job: { $in: jobIds } })
        .populate('job', 'title location type')
        .populate('student', 'name email')
        .sort({ appliedDate: -1 });
    } else if (req.user.role === 'admin') {
      // If admin, get all applications
      applications = await Application.find()
        .populate('job', 'title company location')
        .populate('student', 'name email')
        .sort({ appliedDate: -1 });
    }
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get applications for a specific job
router.get('/job/:jobId', authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Find job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    // Check if user is job owner or admin
    if (job.company.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to view these applications' });
    }
    
    // Get applications
    const applications = await Application.find({ job: jobId })
      .populate('student', 'name email avatar')
      .sort({ appliedDate: -1 });
      
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Apply to a job (students only)
router.post('/apply/:jobId', authMiddleware, isStudent, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter } = req.body;
    
    // Find job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    // Check if job is open
    if (job.status !== 'Open') {
      return res.status(400).json({ error: 'This job is not accepting applications' });
    }
    
    // Check if student already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      student: req.user._id
    });
    
    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied to this job' });
    }
    
    // Create application
    const newApplication = new Application({
      job: jobId,
      student: req.user._id,
      coverLetter
    });
    
    await newApplication.save();
    
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update application status (companies only)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Offered', 'Accepted', 'Withdrawn'].includes(status)) {
      return res.status(400).json({ error: 'Invalid application status' });
    }
    
    // Find application
    const application = await Application.findById(id)
      .populate('job');
      
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    // Check authorization
    if (req.user.role === 'company') {
      // If company, check if job belongs to them
      if (application.job.company.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Not authorized to update this application' });
      }
    } else if (req.user.role === 'student') {
      // If student, they can only withdraw their own applications
      if (application.student.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Not authorized to update this application' });
      }
      
      // Students can only set status to 'Withdrawn'
      if (status !== 'Withdrawn') {
        return res.status(403).json({ error: 'Students can only withdraw applications' });
      }
    } else if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update application status' });
    }
    
    // Update status
    application.status = status;
    await application.save();
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete application (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete applications' });
    }
    
    const { id } = req.params;
    
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    await application.deleteOne();
    
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
