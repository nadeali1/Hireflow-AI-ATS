import Application from "../models/Application.js";

export const getApplications = async (req, res, next) => {
  try {
    const { search = "", status = "" } = req.query;
    const query = { user: req.user._id };

    if (status && status !== "All") {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: "i" } },
        { jobTitle: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.json({ applications });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user._id });
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }
    res.json({ application });
  } catch (error) {
    next(error);
  }
};

export const createApplication = async (req, res, next) => {
  try {
    const { company, jobTitle } = req.body;
    if (!company || !jobTitle) {
      return res.status(400).json({ message: "Company and job title are required." });
    }
    const application = await Application.create({ ...req.body, user: req.user._id });
    res.status(201).json({ application });
  } catch (error) {
    next(error);
  }
};

export const updateApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }
    res.json({ application });
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }
    res.json({ message: "Application deleted." });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const applications = await Application.find({ user: req.user._id });

    const stats = {
      total: applications.length,
      Saved: 0,
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
    };
    applications.forEach((app) => {
      stats[app.status] = (stats[app.status] || 0) + 1;
    });

    const recent = [...applications]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    res.json({ stats, recent });
  } catch (error) {
    next(error);
  }
};
