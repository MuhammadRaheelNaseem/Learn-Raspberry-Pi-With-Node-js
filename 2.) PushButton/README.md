
<div class='jumbotron alert-success'><h1>2.) PushButton</h1></div>

# `Circuit Diagram:`

![image](https://user-images.githubusercontent.com/63813881/176369508-b414acd7-34f5-478a-a34a-3ef3ee4f0402.png)

# `Code: 1`
<pre>
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  LED.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
});

function unexportOnClose() { //function to run when exiting program
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
</pre>

# `Code: 2`
<pre>
var wpi = require('wiring-pi');

// GPIO pin of the button
var configPin = 7;

wpi.setup('wpi');
var started = false;
var clock = null;

wpi.pinMode(configPin, wpi.INPUT);
wpi.pullUpDnControl(configPin, wpi.PUD_UP);
wpi.wiringPiISR(configPin, wpi.INT_EDGE_BOTH, function() {
  if (wpi.digitalRead(configPin)) {
    if (false === started) {
      started = true;
      clock = setTimeout(handleButton, 3000);
    }
  }
  else {
    started = false;
    clearTimeout(clock);
  }
});

function handleButton() {
  if (wpi.digitalRead(configPin)) {
    console.log('OK');
  }
}
</pre>

<div class='alert-success'><p>pi@raspberrypi:~ $ sudo node btnled.js</p></div>
