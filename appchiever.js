//here is the database
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function(){
      return Tasks.find({}, {sort: {createdAt: -1}});
    }

  });

  Template.body.events({
    "submit .new-task": function(event){
      var text = event.target.text.value;
        console.log(text);

      Tasks.insert({
        text: text,
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