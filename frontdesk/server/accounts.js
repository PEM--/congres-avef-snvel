Accounts.onCreateUser(function(options, user) {
  user.roles = ['public', 'admin'];
  Roles.addUsersToRoles(user._id, ['admin']);
  return user;
});
