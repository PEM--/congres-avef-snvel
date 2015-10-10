// Server only

// Global Braintree gateway
braintreeGateway = null;

const ERROR_TYPE = 'payment';

// Create Gateway
Meteor.startup(() => {
  const settings = Meteor.settings.braintree;
  log.info('Connecting server to Braintree in', settings.accountType, 'mode');
  try {
    const envType = Braintree.Environment[settings.accountType];
    braintreeGateway = BrainTreeConnect({
      environment: envType,
      merchantId: settings.merchantId,
      publicKey: settings.publicKey,
      privateKey: settings.privateKey
    });
  } catch (error) {
    throw new Meteor.Error(ERROR_TYPE, error.message);
  }
});

Meteor.methods({
  // Braintree token generation
  clientToken(cb) {
    // Check of client is connected
    if (!this.userId) {
      throw new Meteor.Error(ERROR_TYPE, '403: Non authorized');
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
      throw new Meteor.Error(ERROR_TYPE, 'Client inconnu pour le paiement', this.userId);
    }
    const email = user.emails[0].address;
    // Check if customer already owns a Braintree customer ID
    let braintreeCustomerId;
    if (!user.profile.braintreeCustomerId) {
      // Create a Braintree customer ID
      const result = braintreeGateway.customer.create({
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        email,
        streetAddress: user.profile.streetAddress,
        postalCode: user.profile.postalCode,
        locality: user.profile.city
      });
      if (!result || !result.success || !result.customer || !result.customer.id) {
        log.warn('Braintree Error for', email, result);
        throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', email);
      }
      log.info('Customer ID create for customer', email, result.customer.id);
      braintreeCustomerId = result.customer.id;
      Meteor.users.update({_id: this.userId}, {
        $set: {
          'profile.braintreeCustomerId': result.customer.id,
          modifiedAt: new Date()
        }
      });
    } else {
      braintreeCustomerId = user.profile.braintreeCustomerId;
    }
    // Create token for customer
    const result = braintreeGateway.clientToken.generate({
      customerId: braintreeCustomerId
    });
    if (!result || !result.token) {
      log.warn('Braintree Error for', email, result);
      throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', email);
    }
    log.info('Payment token createad for', email);
    return {
      braintreeCustomerId,
      token: result.token
    };
  },
  // Braintree card payment using nonce
  cardPayment(nonce, amount, cb) {
    // Check of client is connected
    if (!this.userId) {
      throw new Meteor.Error('payment', '403: Non authorized');
    }
    // Check transimtted data consistency
    check(nonce, String);
    check(amount, String);
    check(cb, Match.Any);
    if (amount <= 0 || amount > 10000) {
      throw new Meteor.Error('payment', '403: Non authorized');
    }
    const user = Meteor.users.findOne(this.userId);
    log.info('Creating customer on Braintree');

  }
});

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
