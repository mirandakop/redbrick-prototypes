/*
  Analog input, analog output, serial output
 
 Reads an analog input pin, maps the result to a range from 0 to 255
 and uses the result to set the pulsewidth modulation (PWM) of an output pin.
 Also prints the results to the serial monitor.
 
 The circuit:
 * potentiometer connected to analog pin 0.
   Center pin of the potentiometer goes to the analog pin.
   side pins of the potentiometer go to +5V and ground
 * LED connected from digital pin 9 to ground
 
 created 29 Dec. 2008
 modified 9 Apr 2012
 by Tom Igoe
 
 This example code is in the public domain.
 
 */

// These constants won't change.  They're used to give names
// to the pins used:
//const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to
//const int analogOutPin = 9; // Analog output pin that the LED is attached to

int sensePin =0;
int sensorValue = 0;        // value read from the pot
int outputValue = 0;        // value output to the PWM (analog out)
int fsrAnalogPin = 0; // FSR is connected to analog 0
int LEDpin = 9; // connect Red LED to pin 11 (PWM pin)
int fsrReading; // the analog reading from the FSR resistor divider
int LEDbrightness;

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
}

void loop() {
   fsrReading = analogRead(fsrAnalogPin);
Serial.print("Analog reading = ");
Serial.println(fsrReading);
  // read the analog in value:
  // map it to the range of the analog out:
 LEDbrightness = map(fsrReading, 0, 1023, 0, 255);
 // change the analog out value:
 analogWrite(LEDpin, LEDbrightness);
 
  // print the results to the serial monitor:
  Serial.print("sensor = " );                      
  Serial.print(sensorValue);      
  Serial.print("\t output = ");      
  Serial.println(LEDbrightness);  

  // wait 2 milliseconds before the next loop
  // for the analog-to-digital converter to settle
  // after the last reading:
  delay(100);                    
}

