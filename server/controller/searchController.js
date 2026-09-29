const User = require("../model/user");

exports.postSearch = async (req, res, next) => {
  const { search } = req.body;

  if (!search) {
    return res.json({ searchResult: [] });
  }

  const user = await User.find({
    $or: [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
      { skills: { $regex: search, $options: "i" } },
    ],
  });

  return res.json({ searchResult: user });
};

exports.getSearchResult = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err });
  }
};
