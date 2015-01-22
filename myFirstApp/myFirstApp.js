messageCollection = new Meteor.Collection('messages');


if (Meteor.isClient) {
  // counter starts at 0
  //Session.setDefault("counter", 0);

  Template.hello.helpers({
    arduino: function () {

		var value = messageCollection.findOne({name:'messages'});
	//	console.log('message: '+value);
		return value;
    },

    valueHelper:function(value) {

      value = value/1023;
      return value;

    },



  });



  Template.svgtest.helpers({
    arduino: function () {
      var value = messageCollection.findOne({name:'messages'});
      console.log('message: '+value);
      return value;
    },

    valueOffset:function(value) {

      value = value/1023; // normaliseren
      var percentage = Math.round(value *100); // omreken naar percentage 0 - 100
      return {offset:percentage+'%'}; // maak een offset met dit percentage

    }
  });


  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when butto is clicked
  //     Session.set("counter", Session.get("counter") + 1);
  //   }
  // });
  //  Template.leaderboard.players = function () {
  //    return Players.find({}, {sort: {score: -1, name: 1}});
  //};
  //Template.leaderboard.selected_name = function () {
  //    var player = Players.findOne(Session.get("selected_player"));
  //    return player && player.name;
  //  };
  //  Template.player.selected = function () {
  //    return Session.equals("selected_player", this._id) ? "selected" : '';
  //};
  //  Template.leaderboard.events({
  //    'click input.inc': function () {
  //      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
  //    }
  //  });
  //  Template.player.events({
  //    'click': function () {
  //      Session.set("selected_player", this._id);
  //    }
  //  });

}




if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup



	  var messageID = messageCollection.insert({'name':'messages'});

    //or whatever your device is connected to
    var serialPort = new SerialPort.SerialPort("/dev/cu.usbmodem1411", {
      baudrate: 9600,
      parser: SerialPort.parsers.readline('\r\n')
    });
    serialPort.on('open', function() {
      console.log('Port open');
    });


    var pressureValue;
    var potValue;


    //receive data
    serialPort.on('data', function(arduinoData) {
      //console.log(arduinoData.length);

      var valueChopped = arduinoData.split(':');

      switch (valueChopped[0]) {
      case 'pressureValue':
        pressureValue = valueChopped[1];
        break;
      case 'potValue':
        potValue = valueChopped[1];
        break;
      }

//      console.log(valueChopped);

    });




    Meteor.setInterval(function(){
      messageCollection.update({_id:messageID},
		  {
          'pressureValue':pressureValue,
          'potValue':potValue,
			     'name':'messages'
        }
      );

    },50);

  });


}
