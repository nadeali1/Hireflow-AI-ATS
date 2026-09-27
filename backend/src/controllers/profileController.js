export const updateProfile = async (req, res, next) => {
  try {
    const fields = ["name", "phone", "location", "title", "linkedin", "github", "portfolio"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        req.user[field] = req.body[field];
      }
    });
    await req.user.save();
    res.json({ user: req.user.toSafeObject() });
  } catch (error) {
    next(error);
  }
};
