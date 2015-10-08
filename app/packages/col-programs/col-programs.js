// Options used on the server and the client
const sharedOptions = {
  name: 'Programs',
  schema: {
    programs: { type: [String], label: 'Programme(s)', min: 1, max: 8 },
    'programs.$': { type: String, label: 'Programme', min: 2, max: 256 },
    session: { type: String, label: 'Session', min: 2, max: 256 },
    conference: { type: String, label: 'Conférence', min: 2, max: 256 },
    day: { type: String, label: 'Jour', min: 2, max: 256 },
    begin: { type: String, label: 'Début', min: 2, max: 256 },
    end: { type: String, label: 'Fin', min: 2, max: 256 },
    moderator: { type: String, label: 'Modérateur', min: 2, max: 256 },
    speakers: { type: Array, label: 'Intervenant(s)', min: 1, max: 16 },
    'speakers.$': { type: String, label: 'Intervenant', min: 2, max: 256 },
    rooms: { type: Array, label: 'Salle(s)', min: 1, max: 4 },
    'rooms.$': { type: String, label: 'Salle', min: 2, max: 256 },
    right: { type: String, label: 'Droit', min: 2, max: 256 },
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
