// Server only
Meteor.startup(() => {
  const settings = Meteor.settings.braintree;
  log.info('Connecting server to Braintree in', settings.accountType, 'mode');
  try {
    const envType = Braintree.Environment[settings.accountType];
    brainTreeConnect = BrainTreeConnect({
      environment: envType,
      merchantId: settings.merchantId,
      publicKey: settings.publicKey,
      privateKey: settings.privateKey
    });
  } catch (error) {
    throw new Meteor.Error(1001, error.message);
  }
});

Meteor.methods({
  // Check of client is connected
  clientToken(cb) {
    if (!this.userId) {
      throw new Meteor.Error('User retrieval', '403: Non authorized');
    }
    // Check transimtted data consistency
    check(cb, Match.Any);
    log.info('Creating customer on Braintree');
    // Check profile consistency
    const user = Meteor.users.findOne(this.userId);
    if (!user.profile.lastname || !user.profile.firstName ||
      !user.emails || !user.emails[0] || !user.emails[0].address || !user.emails[0].verified ||
      !user.profile.streetAddress || !user.profile.postalCode || !user.profile.city) {
      log.warn('Fraud attempt', user);
      throw new Meteor.Error('payment', 'Client inconnu pour le paiement', this.userId);
    }
    // Check if customer already owns a Braintree customer ID
    if (!user.profile.braintreeCustomerId) {
      // Create a Braintree customer ID
      let braintreeCustomer = brainTreeConnect.customer.create({
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        email: user.emails[0].address,
        streetAddress: user.profile.streetAddress,
        postalCode: user.profile.postalCode,
        locality: user.profile.city
      });
      log.info('Customer ID create for customer', user.emails[0].address);
    }
  }


    // # Treat optional informations
    // braintreeCustomer = BrainTreeConnect.customer.create braintreeCustomer
    // log.info 'Updating DB for Braintree customer', braintreeCustomer
    // # Create token for customer
    // token = BrainTreeConnect.clientToken.generate
    //   customerId: braintreeCustomer.customer.id
    // log.info 'Payment token created', token
    // Subscribers.update clientDb._id, $set:
    //   paymentUserValidated: true
    //   paymentType: 'card'
    //   braintreeCustomerId: braintreeCustomer.customer.id
    //   paymentCardToken: token.clientToken
    //   amount: PRICING_TABLE[clientDb.profile].amount
    // log.info 'Customer and token created'
    // return {
    //   customer: braintreeCustomer
    //   token: token
    // }
})

  // cardPayment: (customerId, nonce) ->
  //   log.info 'Payment by card'
  //   # Check if client is in the database
  //   try
  //     check customerId, String
  //     check nonce, String
  //     log.info 'Find client in DB', customerId
  //     clientDb = Subscribers.findOne braintreeCustomerId: customerId
  //     unless clientDb?
  //       throw new Meteor.Error 'payment', 'Client inconnu pour le paiement'
  //     # Perform the payment
  //     log.info 'Creating a sale transaction', clientDb, nonce
  //     result = BrainTreeConnect.transaction.sale
  //       amount: s.numberFormat PRICING_TABLE[clientDb.profile].amount, 2
  //       paymentMethodNonce: nonce
  //     log.info 'Updating DB for the payment', result
  //     throw new Meteor.Error 'payment', result.message unless result.success
  //     Subscribers.update clientDb._id, $set:
  //       paymentStatus: true
  //       paymentTransactionId: result.transaction.id
  //     log.info 'Payment request performed'
  //     return result
  //   catch error
  //     log.warn 'Fraud attempt:', error.message
  //     throw new Meteor.Error 'payment',
  //       'Vos informations de paiement ne sont pas consistantes.'
