messageCollection = new Meteor.Collection('messages');


if (Meteor.isClient) {
  // counter starts at 0
  //Session.setDefault("counter", 0);
  Session.setDefault("temperatuur", 0);
  Session.setDefault("temperatuurtwee", 0);


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

    temperatuur: function () {
      return Session.get("temperatuur");
    },

    temperatuurtwee: function () {
      return Session.get("temperatuurtwee");
    },

  });


  Template.hello.rendered = function() {
    Meteor.Keybindings.addOne ('g',function () {
      Session.set("temperatuur",Session.get("temperatuur")+1);
      console.log("KEYUP OR CLICK");
    });
    Meteor.Keybindings.addOne ('b',function () {
      Session.set("temperatuur",Session.get("temperatuur")-1);
    });
    Meteor.Keybindings.addOne ('f',function () {
      Session.set("temperatuurtwee",Session.get("temperatuurtwee")+1);
      console.log("KEYUP OR CLICK");
    });
    Meteor.Keybindings.addOne ('p',function () {
      Session.set("temperatuurtwee",Session.get("temperatuurtwee")-1);
    });

}

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

    },

    temperatuur: function () {
      return Session.get("temperatuur");
    },

    temperatuurtwee: function () {
      return Session.get("temperatuurtwee");
    },

  });

//  Template.newLink.events = {
//    'keypress input.newLink': function (evt, template) {
//      if (evt.which === 13) {
//        var url = template.find(".newLink").value;
//        // add to database
//      }
//    }
//  };

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when butto is clicked
  //     Session.set("counter", Session.get("counter") + 1);
  //   }
  // });

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

    var temperatuur;
    var temperatuurOne;
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
          'temperatuur':temperatuur,
			    'name':'messages'
        }
      );

    },50);

  });


}
