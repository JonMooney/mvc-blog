const User = require('./User');
const post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'user_id',
});

// Painting.belongsTo(Gallery, {
//   foreignKey: 'gallery_id',
// });

module.exports = { User, Post };
