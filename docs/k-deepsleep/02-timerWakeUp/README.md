---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---


# Timer Wake Up

![Wake Up op basis van tijd (timer).](./images/fig1.png)

The ESP32 can go into deep sleep mode, and then wake up at predefined periods of time. This feature is especially useful if you are running projects that require time stamping or daily tasks, while maintaining low power consumption.

To put the ESP32 in deep sleep mode for a predetermined number of seconds, you just have to use the `deepsleep()` function from the `machine` module. This function accepts as arguments, the sleep time in milliseconds as follows:

```python
machine.deepsleep(sleep_time_ms)
```

Let’s look at a simple example to see how it works. In the following code, the ESP32 is in deep sleep mode for 10 seconds, then it wakes up, blinks an LED, and goes back to sleep.

```python
from machine import deepsleep
from machine import Pin
from time import sleep

led = Pin (13, Pin.OUT)

#blink LED
led.value(1)
sleep(1)
led.value(0)
sleep(1)

# wait 5 seconds so that you can catch the ESP awake to establish a serial communication later
# you should remove this sleep line in your final script
sleep(5)

print('Im awake, but Im going to sleep')

#sleep for 10 seconds (10000 milliseconds)
deepsleep(10000)
```

## How the Code Works

First, import the necessary libraries:

```python
import machine
from machine import Pin
from time import sleep
```

Create a `Pin` object that refers to <span style="color:blue">GPIO 13</span> called `led`. This refers to the on-board LED.

```python
led = Pin (13, Pin.OUT)
```

The following commands blink the LED.

```python
led.value(1)
sleep(1)
led.value(0)
sleep(1)
```

In this case, we’re blinking an LED for demonstration purposes, but the idea is to add your main code in this section of the script.

Before going to sleep, we add a delay of 5 seconds and print a message to indicate that it’s going to sleep.

```python
sleep(5)
print('Im awake, but Im going to sleep')
```

It’s important to add a 5 seconds delay before going to sleep when we are developing the scripts. When you want to upload a new code to the board, it needs to be awake. So, if you don’t have the delay, it will be difficult to catch it awake to upload new code later on. After having the final code, you can delete that delay.

Finally, put the ESP32 in deep sleep for 10 seconds (10 000 milliseconds).

```python
machine.deepsleep(10000)
```

After 10 seconds, the ESP32 wakes up and runs the code from the start, similarly to when you press the EN/RST button.

