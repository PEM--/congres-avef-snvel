Meteor.methods({
  updatePresence(userId, programId) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('frontdesk', 'Unauthorized');
    }
    check(userId, String);
    check(programId, String);
    let user = Meteor.users.findOne(userId);
    if (!user) {
      console.warn('Error retrieving user in DB', userId);
      throw new Meteor.Error('frontdesk', 'Unknow user');
    }
    try {
      if (!user.profile.presence) {
        user.profile.presence = [];
      }
      user.profile.presence.push(programId);
      Meteor.users.update(userId, {$set: {'profile.presence': user.profile.presence}});
      console.log('Presence updated for', user, 'by', this.userId, 'with', programId);
    } catch (error) {
      console.warn('Error while updating user presence', userId, 'with program', programId, ':', error);
      throw new Meteor.Error('frontdesk', 'Error while updating user presence');
    }
  }
});
