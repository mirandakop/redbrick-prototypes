(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var SerialPort;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/meteor-package-serialport/serialport.js                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
SerialPort = Npm.require('serialport');                              // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteor-package-serialport'] = {
  SerialPort: SerialPort
};

})();

//# sourceMappingURL=meteor-package-serialport.js.map
