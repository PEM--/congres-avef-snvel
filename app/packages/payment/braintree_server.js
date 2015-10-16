// Server only

// Global Braintree gateway
SD.Utils.braintreeGateway = null;

const ERROR_TYPE = 'payment';

// Create Gateway
Meteor.startup(() => {
  const settings = Meteor.settings.braintree;
  log.info('Connecting server to Braintree in', settings.accountType, 'mode');
  try {
    const envType = Braintree.Environment[settings.accountType];
    SD.Utils.braintreeGateway = BrainTreeConnect({
      environment: envType,
      merchantId: settings.merchantId,
      publicKey: settings.publicKey,
      privateKey: settings.privateKey
    });
    log.info('Braintree gateway configured.');
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
    if (!user.profile.lastName || !user.profile.firstName ||
      !user.emails || !user.emails[0] || !user.emails[0].address || !user.emails[0].verified ||
      !user.profile.streetAddress || !user.profile.postalCode || !user.profile.city) {
      log.warn('Fraud attempt: not enough user information', user);
      throw new Meteor.Error(ERROR_TYPE, 'Client inconnu pour le paiement', this.userId);
    }
    const email = user.emails[0].address;
    if (!Roles.userIsInRole(this.userId, 'payment_pending')) {
      log.warn('Fraud attempt: wrong role for user', user, 'whit roles', Roles.getRolesForUser(this.userId));
      throw new Meteor.Error(ERROR_TYPE, 'Client inconnu pour le paiement', this.userId);
    }
    // Check if customer already owns a Braintree customer ID
    let braintreeCustomerId;
    if (!user.profile.braintreeCustomerId) {
      // Create a Braintree customer ID
      const result = SD.Utils.braintreeGateway.customer.create({
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        email
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
    const result = SD.Utils.braintreeGateway.clientToken.generate({
      customerId: braintreeCustomerId
    });
    if (!result || !result.clientToken) {
      log.warn('Braintree Error for', email, result);
      throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', email);
    }
    log.info('Payment token createad for', email);
    return {
      braintreeCustomerId,
      token: result.clientToken
    };
  },
  // Braintree card payment using nonce
  cardPayment(nonce, invoice, cb) {
    console.log(invoice);
    // Check of client is connected
    if (!this.userId) {
      throw new Meteor.Error('payment', '403: Non authorized');
    }
    // Check transimtted data consistency
    check(nonce, String);
    check(invoice, SD.Structure.InvoiceSchema);
    check(cb, Match.Any);
    const user = Meteor.users.findOne(this.userId);
    const email = user.emails[0].address;
    if (!Roles.userIsInRole(this.userId, 'payment_pending')) {
      log.warn('Fraud attempt: wrong role for user', user, 'whit roles', Roles.getRolesForUser(this.userId));
      throw new Meteor.Error(ERROR_TYPE, 'Client inconnu pour le paiement', this.userId);
    }
    if (!user.profile.braintreeCustomerId) {
      log.warn('Fraud alert: missing braintreeCustomerId', email);
      throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', email);
    }
    Meteor.users.update({_id: this.userId}, {
      $set: {
        invoice,
        modifiedAt: new Date()
      }
    });
    // Get amount in UK/EN/US format and switch back current language
    numeral.language('en');
    amount = numeral(invoice.totalTTC).format('00.00');
    numeral.language(getUserLanguage());
    result = SD.Utils.braintreeGateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    });
    if (!result || !result.success) {
      log.warn('Braintree Error for', email, result);
      throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', email);
    }
    log.info('Payment for user', email, 'with amount', invoice.totalTTC);
    // Set proper roles for user
    Roles.addUsersToRoles(this.userId, 'subscribed');
    Roles.removeUsersFromRoles(this.userId, 'payment_pending');
    // Send the billing email
    this.unblock();
    const cgv = SD.Structure.basicPages.collection.findOne({url: 'cgv'});
    const html = s.replaceAll(marked(cgv.content), '\n', '');
    const invoiceTxt = SD.Utils.renderInvoice(invoice.prices, invoice.discounts, invoice.totalHT, invoice.totalTTC);
    sendBillingEmail(email, invoiceTxt, cgv.title, html);
    return true;
  }
});
