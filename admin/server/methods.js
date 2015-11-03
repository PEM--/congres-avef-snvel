Meteor.methods({
  automaticInscription(userLine) {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error('admin', 'Unauthorized');
    }
    try {
      check(userLine, String);
      const tokens = userLine.split(',');
      if (!tokens) {
        throw new Meteor.Error('admin', 'Grammaire invalide');
      }
      let email = tokens[0].trim().toLowerCase();
      if (email === '') {
        email = `fake-${Meteor.users.find().count()}@congres-avef-snvel.fr`;
      }
      const password = textInputFormatter(tokens[4]) + '-' + textInputFormatter(tokens[5]);
      let status = tokens[1].trim().toLowerCase();
      const lastName = textInputFormatter(tokens[4]);
      const firstName = textInputFormatter(tokens[5]);
      const streetAddress = tokens[6] !== '' ? textInputFormatter(tokens[6]) : '?????';
      const postalCode = tokens[7] ? tokens[7].trim() : '?????';
      const city = tokens[8] ? textInputFormatter(tokens[8]) : '?????';
      let setAdmin = false;
      let job = '';
      let avef = '';
      let snvel = '';
      // Try to find user in the subscribers
      let subscriber = SD.Structure.subscribers.collection.findOne({
        'userInfo.email': email });
      // If not found, check fistname and lastName
      if (!subscriber) {
        subscriber = SD.Structure.subscribers.collection.findOne({
          $and: [
            {'userInfo.lastName': lastName},
            {'userInfo.firstName': firstName}
          ]
        });
      }
      // If found, user is a veterinary with subscriber number
      // ['basic', 'avef', 'snvel', 'snvelDelegate', 'seniorJuniorVetCcp', 'nurseDentistSmith', 'junior']
      if (status !== '' && subscriber && subscriber.userInfo && subscriber.userInfo.snvel) {
        job = 'snvelDelegate';
        if (status === 'administrateur') {
          setAdmin = true;
        }
      } else if (subscriber && subscriber.userInfo && subscriber.userInfo.snvel) {
        job = 'snvel';
      } else if (subscriber && subscriber.userInfo && subscriber.userInfo.avef) {
        job = 'avef';
      } else {
        switch (tokens[10]) {
        case 'Adhérent Senior':
          job = 'seniorJuniorVetCcp';
          break;
        case 'Adhérent Normal':
          job = 'basic';
          break;
        case 'Délégué SNVEL':
          job = 'snvelDelegate';
          status = 'delegue';
          break;
        case 'Adhérent Jeune Vétérinaire':
          job = 'seniorJuniorVetCcp';
          break;
        case 'Adhérent Junior':
          job = 'junior';
          break;
        case 'ASV':
          job = 'nurseDentistSmith';
          break;
        case 'ASV':
          job = 'nurseDentistSmith';
          break;
        case 'Auteur Courte Communication ou Poster':
          job = 'seniorJuniorVetCcp';
          break;
        case 'Maréchal Ferrant':
          job = 'nurseDentistSmith';
          break;
        case 'ASV':
          job = 'nurseDentistSmith';
          break;
        case 'TDE':
          job = 'nurseDentistSmith';
          break;
        case 'ASV ou TDE':
          job = 'nurseDentistSmith';
          break;
        case 'Vétérinaire ou Etudiant Non Adhérent AVEF ou SNVEL':
          job = 'basic';
          break;
        case 'EBMS':
          job = 'basic';
          break;
        case 'Staff':
          job = 'basic';
          setAdmin = true;
          break;
        case 'Conférencier':
          job = 'basic';
          setAdmin = true;
          break;
        case 'INVITE':
          job = 'basic';
          setAdmin = true;
          break;
        case 'Exposant':
          job = 'basic';
          break;
        default:
          throw new Meteor.Error('admin', 'Profession indéterminée');
        }
      }
      // Programs
      const programs = ['EBMS', 'SNVEL', 'AVEF'];
      // Rights
      let rights = [];
      // Concatenated column
      if (tokens[54]) {
        sessions = tokens[54].split('/');
        sessions.forEach(session => {
          session = session.trim();
          if (session.length !== 24 && session.length !== 0) {
            throw new Meteor.Error('admin', `Droit incohérent : longueur ${session.length}, droit: ${session}`);
          }
          rights.push(session);
        });
      }
      userId = Accounts.createUser({
        email,
        password,
        profile: {
          status,
          avef,
          snvel,
          lastName,
          firstName,
          streetAddress,
          postalCode,
          city,
          email,
          job,
          programs,
          rights
        }
      });
      // Set admin rights
      if (setAdmin) {
        Roles.addUsersToRoles(userId, 'admin');
      }
      console.log(this.userId, 'has inserted a new user: ', email, userId);
    } catch (error) {
      console.warn('Error inserting user', error);
      // Relaunch error done by this function
      if (error.error === 'admin') {
        throw error;
      }
      throw new Meteor.Error('admin', error.toString());
    }
  },
  insertDocument(newDocument, collectionName) {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error('admin', 'Unauthorized');
    }
    try {
      check(collectionName, String);
      const definition = _.find(SharedTablesDefinition, route => {
        return route.name.toLowerCase() === collectionName;
      });
      if (!definition) {
        throw new Meteor.Error('admin', 'Unknown collection');
      }
      check(newDocument, definition.conf.schema);
      const documentId = definition.conf.collection.insert(newDocument);
      console.log(this.userId, 'has inserted a new document', documentId, 'in collection', definition.name);
    } catch (error) {
      console.warn('Error inserting document', error);
      // Relaunch error done by this function
      if (error.error === 'admin') {
        throw error;
      }
      throw new Meteor.Error('admin', error.toString());
    }
  },
  updateDocument(update, documentId, collectionName) {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error('admin', 'Unauthorized');
    }
    try {
      check(documentId, String);
      check(collectionName, String);
      const definition = _.find(SharedTablesDefinition, route => {
        return route.name.toLowerCase() === collectionName;
      });
      if (!definition) {
        throw new Meteor.Error('admin', 'Unknown collection');
      }
      check(update, definition.conf.schema);
      console.log(this.userId, 'has modified document', documentId, 'from collection', definition.name);
      definition.conf.collection.update(documentId, update);
    } catch (error) {
      console.warn('Error updating document', error);
      // Relaunch error done by this function
      if (error.error === 'admin') {
        throw error;
      }
      throw new Meteor.Error('admin', error.toString());
    }
  },
  removeDocument(documentId, collectionName) {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error('admin', 'Unauthorized');
    }
    try {
      check(documentId, String);
      check(collectionName, String);
      const definition = _.find(SharedTablesDefinition, route => {
        return route.name.toLowerCase() === collectionName;
      });
      if (!definition) {
        throw new Meteor.Error('admin', 'Unknown collection');
      }
      console.log(this.userId, 'has deleted document', documentId, 'from collection', definition.name);
      definition.conf.collection.remove(documentId);
    } catch (error) {
      console.warn('Error removing document', error);
      // Relaunch error done by this function
      if (error.error === 'admin') {
        throw error;
      }
      throw new Meteor.Error('admin', error.toString());
    }
  },
  dictionaryUpdate: function(update, documentId) {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error('admin', 'Unauthorized');
    }
    try {
      check(update, SD.Structure.dictionary.schema);
      check(documentId, String);
      SD.Structure.dictionary.collection.update(documentId, update);
      console.log('Dictionary updated');
    } catch (error) {
      console.warn('Error updating dictionary', error);
      // Relaunch error done by this function
      if (error.error === 'admin') {
        throw error;
      }
      throw new Meteor.Error('admin', error.toString());
    }
  }
});
