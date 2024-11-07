const userLogout = (req, res) => {
  res.cookie('authToken', '')
  res.redirect('/')
}
export default userLogout
