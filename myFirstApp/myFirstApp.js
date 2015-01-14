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
      value = value/1024;

      return value;

      potvalue = value/1024 ('stop-opacity:100');
      potvalueOne = value/824 ('stop-opacity:80');
      potvalueTwo = value/424 ('stop-opacity:40');
      potvalueThree = value/224 ('stop-opacity:20');
      potvalueFour = value/0 ('stop-opacity:0');
    }


  });




  Template.svgtest.helpers({
    arduino: function () {
      var value = messageCollection.findOne({name:'messages'});
      console.log('message: '+value);
      return value;
    }
  });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
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
