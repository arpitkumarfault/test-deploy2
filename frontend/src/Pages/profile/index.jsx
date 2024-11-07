import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get('/api/v4/user/get-user-data')
      .then((response) => {
        setUserData(response.data);
        console.log('User data:', response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleProfileImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('/api/v4/user/upload-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.status === 200) {
        alert('Profile picture updated successfully!');
        fetchUserData(); // Fetch the updated profile image
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center py-12 px-4">
      <motion.div
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="relative w-32 h-32 mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={userData.profile ? `http://localhost:3000/images/upload/${userData.profile}` : '/default-avatar.png'}
              alt="Profile"
              className="w-full h-full rounded-full object-cover shadow-md border-[3px] border-blue-600"
            />
            <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition">
              <input type="file" onChange={handleFileChange} className="hidden" />
              <span className="material-icons">edit</span>
            </label>
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-800">{userData.username}</h2>
          <p className="text-gray-500">{userData.email}</p>
        </div>

        <form onSubmit={handleProfileImageUpload} className="mt-4">
          <motion.button
            type="submit"
            className="w-full py-2 px-4 mt-2 font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload Profile Image
          </motion.button>
        </form>

        <motion.button
          onClick={() => setShowPasswordModal(true)}
          className="w-full py-3 mt-6 font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Change Password
        </motion.button>
      </motion.div>

      {showPasswordModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-sm"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-800">Change Password</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
              <div className="flex justify-end space-x-2">
                <motion.button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="py-2 px-4 font-semibold text-gray-700 rounded-md hover:bg-gray-100 transition"
                  whileHover={{ scale: 1.05 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="py-2 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePage;
