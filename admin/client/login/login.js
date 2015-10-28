Template.login.helpers({
  mailto() {
    return `mailto:${s.escapeHTML('Pierre-Eric Marchandet ')}<pemarchandet@gmail.com>?` +
      `cc=` +
        `${s.escapeHTML('Anne Daumas-Marchandet')} <adaumas@snvel.fr>,` +
        `${s.escapeHTML('Claire Scicluna')} <plessisdoc@wanadoo.fr>` +
      `subject=${s.escapeHTML('Congrès AVEF - SNVEL - Demande d\'accès administratif')}`;
  }
});
