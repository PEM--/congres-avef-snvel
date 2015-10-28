Template.login.helpers({
  mailto() {
    return `mailto:${s.escapeHTML('Pierre-Eric Marchandet ')}<pemarchandet@gmail.com>?` +
      `cc=` +
        `${s.escapeHTML('Anne Daumas-Marchandet ')}<adaumas@snvel.fr>,` +
        `${s.escapeHTML('Claire Scicluna ')}<plessisdoc@wanadoo.fr>` +
        '&' +
      `subject=${s.escapeHTML("Congrès AVEF - SNVEL - Accès administratif")}`;
  }
});

Template.login.events({
  'submit form': function(e, t) {
    // e.preventDefault();
    console.log('Form', e);
  },
  'click button': function(e, t) {
    // e.preventDefault();
    console.log('Event', e);
  }
});
