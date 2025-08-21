import Job from "../models/Job.js";

export const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ✅ Correctly check if a user is already in the array of objects
    const alreadyApplied = job.applicants.some(
      (applicant) => applicant.user.toString() === req.user.id
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // ✅ Push the correct object structure, not just the ID
    job.applicants.push({ user: req.user.id });
    await job.save();

    res.status(200).json({ message: "Application successful" });
  } catch (error) {
    console.error(error); // It's helpful to log the full error on the server
    res.status(500).json({ message: "Server error" });
  }
};