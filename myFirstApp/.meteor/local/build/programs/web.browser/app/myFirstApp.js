(function(){messageCollection = new Meteor.Collection('messages');


if (Meteor.isClient) {
  // counter starts at 0

  Session.setDefault("counter", 0);


  Template.hello.helpers({
    arduino: function () {

      return messageCollection.findOne({_id:"5M8qvrXoHaJE2dB5F"});
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

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


      console.log(valueChopped);

    });

    Meteor.setInterval(function(){
      messageCollection.update({_id:"5M8qvrXoHaJE2dB5F"},{'pressureValue':pressureValue,'potValue':potValue});
    },20);

  });
}

})();
