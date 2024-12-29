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

![Voorbeeldprogramma van het schrijven naar een PCF8574.](./images/code1.png)

## Voorbeeld: Schrijven naar en lezen van twee PCF8574 slaves

In het onderstaande voorbeeld worden twee IC’s van het type PCF8574 gebruikt. Het blokschema is weergegeven in de volgende figuur. Het bovenste IC met adres 0x27 wordt gebruikt voor 8 ingangen en daarvan zal gelezen moeten worden. Het onderste IC met adres 0x20 wordt gebruikt om 8 uitgang aan te verbinden en daarvan zal naar geschreven moeten worden.

![Blokschema van het lezen van en schrijven naar twee PCF8574 IC's.](./images/slave1.png)
![Blokschema van het lezen van en schrijven naar twee PCF8574 IC's.](./images/slave2.png)

![Voorbeeldprogramma van het lezen van en schrijven naar twee IO-expanders van het type PCF8574.](./images/code2.png)


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

