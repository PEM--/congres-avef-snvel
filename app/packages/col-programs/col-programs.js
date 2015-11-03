// Options used on the server and the client
const sharedOptions = {
  name: 'Programs',
  schema: {
    programs: { type: [String], label: 'Programme(s)', allowedValues: ['AVEF', 'SNVEL', 'EBMS'] },
    session: { type: String, label: 'Session', min: 2, max: 256 },
    conference: { type: String, label: 'Conférence', min: 2, max: 256 },
    day: { type: String, label: 'Jour', min: 2, max: 256 },
    begin: { type: String, label: 'Début', min: 2, max: 256 },
    end: { type: String, label: 'Fin', min: 2, max: 256 },
    moderator: { type: String, label: 'Modérateur', min: 2, max: 256 },
    speakers: { type: [String], label: 'Intervenant(s)', min: 2, max: 256 },
    rooms: { type: [String], label: 'Salle(s)', allowedValues: [
      'Pays-Bas', 'Amphithéatre', 'Italie', 'Espagne', 'Grèce',
      'Rome', 'Genève', 'Liège', 'Expo commerciale', 'Dock Haussman',
      'Terrasse Hotel', 'NA', ''
    ]},
    right: { type: String, label: 'Droit', min: 2, max: 256, allowedValues: [
      'AM1', 'GdC', 'Jour1', 'TR1', 'TD1', 'TD2', 'TP1', 'TP2', 'TR2', 'TD3',
      'TD4', 'TP3', 'TP4', 'TR3', 'TD5', 'TD6', 'TP5', 'Exhib', 'Diner', 'Jour2',
      'TD7', 'TD8', 'TP6', 'TD9', 'TD10', 'TP7', 'TD11', 'TD12', 'TP8', 'EBMS1',
      'EBMS2', 'EBMS3', 'EBMS4', 'EBMS5', 'EBMS6', 'EBMS7'
    ]},
  },
  // Available subscriptions and publications
  subs: {
    All: {}
  }
};

// Client only
if (Meteor.isClient) {
  class Programs extends SD.Structure.BaseCollection {}
  // Export instance
  SD.Structure.programs = new Programs(sharedOptions);
}

// Server only
if (Meteor.isServer) {
  const log = Logger.createLogger('Collection Program');
  // Get programs as CSV
  const programCsv = Assets.getText('programs.csv');
  let defaults = [];
  programCsv.split('\n').slice(1).map((programLine, idx) => {
    log.info('Analyzing line', idx, 'with content', programLine);
    if (programLine !== '') {
      const tokens = programLine.split(',');
      defaults.push({
        programs: tokens[0].split('/'),
        session: tokens[1].trim(),
        conference: tokens[2].trim(),
        day: tokens[3].trim(),
        begin: tokens[4].trim(),
        end: tokens[5].trim(),
        moderator: tokens[6].trim(),
        speakers: tokens[7].split('/'),
        rooms: tokens[8].split('/'),
        right: tokens[9].trim()
      });
    }
  });
  // Options used only on the server
  const serverOptions = {
    defaults,
    // Set indexes on collection
    indexes: { programs: 1, session: 1, day: 1, begin: 1 }
  };
  class Programs extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.programs = new Programs(sharedOptions, serverOptions);
}
