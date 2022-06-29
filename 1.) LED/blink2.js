var wpi = require('wiring-pi');

// GPIO pin of the led
var configPin = 7;
// Blinking interval in usec
var configTimeout = 1000;

wpi.setup('wpi');
wpi.pinMode(configPin, wpi.OUTPUT);

var isLedOn = 0;

setInterval(function() {
    isLedOn = +!isLedOn;
    //isLedOn = !isLedOn;
    wpi.digitalWrite(configPin, isLedOn );
}, configTimeout);
