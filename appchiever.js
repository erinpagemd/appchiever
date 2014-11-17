//here is the database
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks_fresh: function(){
      return Tasks.find({year: 'freshman'});
    },
    tasks_soph: function(){
      return Tasks.find({year: 'sophomore'});
    },
    tasks_jun: function(){
      return Tasks.find({year: 'junior'});
    },
    tasks_sen: function(){
      return Tasks.find({year: 'senior'});
    }

  });

  Template.body.events({
    "submit .new-task": function(event){
      var text = event.target.text.value;
      var year = $(event.target).find('[name=year]:checked').val();
      var category = $(event.target).find('option:selected').val();

      Tasks.insert({
        text: text,
        year: year,
        category: category,
        createdAt: new Date()
      });

      event.target.text.value = "";

      return false;
    }
  })

  Template.task.events({
    'click .delete': function(){
      Tasks.remove(this._id);
    }
  });

}
