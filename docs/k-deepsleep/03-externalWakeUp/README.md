---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

# External Wake Up

The ESP32 can also be awaken from sleep when there is a change on the state of a pin. There are two possibilities of external wake up with the ESP32: ext0 and ext1.

The ext0 mode allows you to use one GPIO as a wake up source. The ext1 mode allows you to set more than one GPIO as a wake up source at the same time.

Only RTC GPIOs can be used as a wake up source. The RTC GPIOs are highlighted with an orange rectangle box in the next diagram.

![De digitale IO-pinnen van de Adafruit Huzzah ESP32 feather.](./images/esp.png)
![De digitale IO-pinnen van de Adafruit Huzzah ESP32 feather.](./images/esp32_2.jpg)

## External wake up – ext0

To illustrate how to use the external wake up ext0, we’ll use one pushbutton as a wake up source. The ESP32 awakes when you press the pushbutton.

:::warning
Je kan gebruik maken van de extentionshield om een drukknop te gebruiken als WakeUp-event. Let wel deze werkt zoals meestal ACTIEF-LAAG met een Pull-up weerstand!!! Gebruik dus in volgende code : esp32.WAKEUP_ALL_LOW
:::

### Script

The following script shows how ext0 works: it uses one GPIO as an external wake up source.

```python
import esp32
from machine import Pin
from machine import deepsleep
from time import sleep

wake1 = Pin(14, mode = Pin.IN)

#level parameter can be: esp32.WAKEUP_ANY_HIGH or esp32.WAKEUP_ALL_LOW
esp32.wake_on_ext0(pin = wake1, level = esp32.WAKEUP_ANY_HIGH)

#your main code goes here to perform a task

print('Im awake. Going to sleep in 10 seconds')
sleep(10)
print('Going to sleep now')
deepsleep()
```
### How the code works

First, you need to import the necessary modules. You need to import the esp32 module that contains the methods to set a pin as a wake up source.

After importing the necessary modules, define a wake up pin. In this case we’re using GPIO14 and we call it wake1. This GPIO should be set as an input (Pin.IN).

```python
wake1 = Pin(14, mode = Pin.IN)
```

Then, set ext0 as a wake up source using the wake_on_ext0() method as follows:

```python
esp32.wake_on_ext0(pin = wake1, level = esp32.WAKEUP_ANY_HIGH)
```

The wake_on_ext0() method accepts as arguments the pin and the level:

## Opdrachten:

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht1: ESP32 als SPI Master en een 8bit GPIO slave.
<ul style="color: white;">
<li>Voor een ontwerp met een ESP32 feather van Adafruit heeft men te weinig uitgangen en wil men deze uitbreiden met een MCP23S09.</li>
<li>Bouw een schema met de ESP32 feather van Adafruit, de ESP32 shield en een MCP23S09 waarbij men de toestand van 2 drukknoppen op de shield weergeeft op 2 leds die aangesloten zijn op de IO-expander.</li>
<li>Sluit 2 rode leds aan met een voorschakelweerstand. Zorg dat de stroom door de leds niet groter wordt dan 5mA. Bereken zelf de voorschakelweerstand.</li>
<li>Sluit een led aan op GP0 en op GP7.</li>
<li>Gebruik SW1 en SW4 van de ESP32 shield.</li>
<li>Als de drukknop SW1 wordt ingedrukt moet de led op GP0 branden. Als SW1 wordt ingedrukt niet is ingedrukt moet GP0 niet branden.</li>
<li>Als de drukknop SW4 wordt ingedrukt moet de led op GP7 branden. Als SW4 wordt ingedrukt niet is ingedrukt moet GP7 niet branden.</li>
<li>Men gebruikt wel SPI maar de adressen moeten hier ook juist aangesloten zijn. Zowel hardwarematig als softwarematig.</li>
<li>Bouw, programmeer en test</li>
</ul>
</p>
</div>