SD.Utils.CardValidation = {
  number(str) {
    if (str.length > 19) {
      return 'Votre n° de carte est trop long.';
    }
    if (str.length < 14) {
      return 'Votre n° de carte est incomplet.';
    }
    if (_.isNaN(s.toNumber(s.replaceAll(str, ' ', '')))) {
      return 'Votre n° de carte ne peut contenir de lettres.';
    }
    return '';
  },
  name(str) {
    if (str.length < 2) {
      return 'Entrez le nom inscrit sur votre carte.';
    }
    if (str.length > 26) {
      return 'Entrez uniquement le nom inscrit sur votre carte.';
    }
    return '';
  },
  expiry(str) {
    if (str.length !== 5) {
      return 'Entrez la date d\'expiration de votre carte.';
    }
    const [strMonth, strYear] = str.split('/');
    const month = s.toNumber(strMonth);
    if ((strMonth.length !== 2) || (_.isNaN(month)) ||
        (month < 1) || (month > 12)) {
      return 'Le mois d\'expiration est inconsistant.';
    }
    if ((_.isUndefined(strYear)) || (strYear.length !== 2)) {
      return 'L\'année d\'expiration est inconsistante.';
    }
    const year = s.toNumber(strYear);
    const currentYear = moment(new Date()).year() - 2000;
    if ((_.isNaN(year)) || (year < currentYear)) {
      return 'L\'année d\'expiration est inconsistante.';
    }
    return '';
  },
  cvc(str) {
    if (((str.length !== 3) && (str.length !== 4)) ||
        (_.isNaN(s.toNumber(str)))) {
      return 'Le cryptogramme doit comporter 3 ou 4 chiffres.';
    }
    return '';
  }
};
