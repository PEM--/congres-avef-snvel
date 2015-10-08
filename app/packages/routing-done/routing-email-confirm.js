// http://localhost:3000/verify-email/Ywfq7Ww2HFU751S-2SUJ43FT2IDDqNmBZLkqCTZVZrc
FlowRouter.route('/verify-email/:token', {
  action(params) {
    check(params.token, String);
    if (Meteor.isClient) {
      Accounts.verifyEmail(params.token, function(error) {
        if (error) {
          log.warn('Email verification failed', error);
          return FlowRouter.redirect('/notfound');
        }
        log.info('Verfication email success');
        FlowRouter.redirect('/subscription?step=2');
      });
    }
  }
});
