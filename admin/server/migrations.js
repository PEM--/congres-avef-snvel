Migrations.add({
  version: 1,
  up: function() {
    // Migrate dictionary's Date
    let dict = SD.Structure.dictionary.collection.findOne();
    dict.startDate = new Date(dict.startDate);
    dict.endDate = new Date(dict.endDate);
    SD.Structure.dictionary.collection.update({_id: dict._id}, {$set: dict});
  }
});

Meteor.startup(function() {
  Migrations.migrateTo('latest');
});
