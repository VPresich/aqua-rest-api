export const getCurrentUserCtrl = async (req, res) => {
  const user = req.user;
  res.json({
    status: 200,
    message: 'Successfully found user info!',
    user,
  });
};
