Meteor.methods({
  updatePresence(userId, programId) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('frontdesk', 'Unauthorized');
    }
    check(userId, String);
    check(programId, String);
    let user = Meteor.users.find(userId);
    if (!user) {
      console.warn('Error retrieving user in DB', userId);
      throw new Meteor.Error('frontdesk', 'Unknow user');
    }
    try {
      if (!user.profile.presence) {
        user.profile.presence = [];
      }
      user.profile.presence.push(programId);
      Meteor.users.update(userId, {$set: {
        'profile.presence': user.profile.presence
      }});
    } catch (error) {
      console.warn('Error while updating user presence', userId, 'with program', programId);
      throw new Meteor.Error('frontdesk', 'Error while updating user presence');
    }
  }
});
