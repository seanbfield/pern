// api/db/services/user.js
const User = require('../models/user');

module.exports = {
  findOrCreate: async (oAuthData) => {
    
    try {
      const user = await User.findOne( { where : { oAuthId: oAuthData.id } });

      if (!user) {
        const newUser =  await User.create({oAuthId: oAuthData.id, oAuthData: oAuthData})
        return newUser
      }
      return user;
    } catch (e) {
      return Error('User not found');
    }
  },
  findById: async (id) => {
    return User.findOne({ where : { oAuthId: id } });
  }
};
