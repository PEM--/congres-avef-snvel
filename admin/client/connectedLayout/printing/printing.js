Template.printing.onCreated(function() {
  this.subscribe('dasboardCollections');
  this.lastName = new ReactiveVar(null);
  this.firstName = new ReactiveVar(null);
  this.city = new ReactiveVar(null);
});

Template.printing.onRendered(function() {
  $('.main-title').children().text('Impression');
});

Template.printing.helpers({
  usersCount() {
    const count = Meteor.users.find().count();
    return numeral(count).format('0,0');
  },
  lastName() {
    const instance = Template.instance();
    return instance.lastName.get();
  },
  firstName() {
    const instance = Template.instance();
    return instance.firstName.get();
  },
  city() {
    const instance = Template.instance();
    return instance.city.get();
  }
});

Template.printing.events({
  'click a.print': function(e, t) {
    e.preventDefault();
    t.$('a.print').toggleClass('disabled');
    const PDF_OPTIONS = {
      size: 'a4',
      margins: {
        top: 570, bottom: 57,
        left: 23, right: 23
      }
    };
    let pdf = new PdfRenderer(PDF_OPTIONS);
    const printableUsers = Meteor.users.find().fetch();
    printableUsers.forEach((user, idx) => {
      t.lastName.set(user.profile.lastName);
      pdf.fontSize(18).moveDown().moveDown().text(
        user.profile.lastName ? user.profile.lastName : ''
      , {
        width: 275,
        height: 28,
        align: 'center',
        ellipsis: true
      });
      t.firstName.set(user.profile.firstName);
      pdf.fontSize(16).moveDown().text(
        user.profile.firstName ? user.profile.firstName : ''
      , {
        width: 275,
        height: 26,
        align: 'center',
        ellipsis: true
      });
      t.city.set(user.profile.city);
      pdf.moveDown().text(
        user.profile.city ? user.profile.city : ''
      , {
        width: 275,
        height: 26,
        align: 'center',
        ellipsis: true
      });
      $('.qr-code-container').html(user.profile.qrImage);
      pdf.translate(360, 590).scale(5.17, 5.17).path(
        $(user.profile.qrImage).children().attr('d')
      ).fill('black');
      console.log('idx', idx);
      if (idx !== printableUsers.length - 1) {
        pdf.addPage(PDF_OPTIONS);
      }
    });
    pdf.finish('badges.pdf', function() {
      t.$('a.print').toggleClass('disabled');
    });
  }
});
