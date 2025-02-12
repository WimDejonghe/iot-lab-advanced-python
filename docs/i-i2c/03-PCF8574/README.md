---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

# ESP32 als I²C Master en een 8bit GPIO slave (PCF8574)

## Voorbeeld: schrijven naar een PCF8574

Een PCF8574 is een 8 bit IO-expander en wordt gebruikt om het aantal IO-pinnen uit te breiden met 8 bits. De interne werking van deze 8bit GPIO I²C slave is in volgende figuur weergegeven.

![Blokschema van een PCF8574 IO-expander.](./images/ic.png)

:::warning
Er bestaat ook een variant op dit IC nl. de PCF8574A en daar is het adres anders. Zoek dit desnoods op.
:::

```python
PCF8574_ADDR = 0x??????

for value in range(256):
    #schrijf 1 byte naar de slave
    i2c.writeto(PCF8574_ADDR, bytes([value]))
    #lees alle uitgangen van de slave in de vorm van 1 byte
    byte_val = (i2c.readfrom(PCF8574_ADDR, 1))
    # converting to int
    # byteorder is big where MSB is at start
    int_val = int.from_bytes(byte_val, "big") 
    #print(int_val)
    sleep(0.05)

```

## Opdrachten:

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht1: ESP32 als I²C Master en een 8bit GPIO slave.
<ul style="color: white;">
<li>Zorg ervoor dat je met het I²C scan programma de bus kan afscannen op zoek naar een slave</li>
</ul>
</p>
</div>

***

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht2: ESP32 als I²C Master en een 8bit GPIO slave.
<ul style="color: white;">
<li>Schakel 8 leds op de GPIO pinnen van de slave (Rv!!!)</li>
<li>Programmeer op de 8 Leds een continu lopend looplicht.</li>
<li><b>!!!Let wel, de uitgangen zijn open-collector uitgangen. Verklaar wat dit is, en hoe moeten de Leds dan geschakeld worden?</b></li>
<li>Hoe moet een uitgang aangestuurd worden zodat de Leds oplichten?</li>
</ul>
</p>
</div>

***

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht3: ESP32 als I²C Master en twee 8bit GPIO slave's.
<ul style="color: white;">
<li>Schakel 8 leds op de GPIO pinnen van de ene slave.</li>
<li>Schakel 2 drukknoppen (Pullup R!!) actief laag op de andere slave.</li>
<li>Programmeer op de 8 Leds, op de ene slave de toestand van ingangen van de andere slave.</li>
</ul>
</p>
</div>

