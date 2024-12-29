---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

# Opdrachten

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht: Voltmeter
<ul style="color: white;">
<li>Maak een voltmeter waarvan de waarde van de gemeten spanning naar de seriële monitor wordt gestuurd.
</li>
<li>De voltmeter meet spanningen tussen 0V en 3,3V (=voedingsspanning). Om de voltmeter te testen maak je gebruik van de trimmer op de ESP32 shield. Je moet niet enkel de waarde versturen maar ook wat de waarde is. Als de loper bijvoorbeeld volledig bovenaan staat zal je de waarde 0V moeten doorsturen. Als de loper volledig onderaan staat zal je de waarde 3,3V moeten doorsturen.</li>
<li>Als je weet dat de ADC (=Analoog naar digitaal converter) een resolutie heeft van 12 bit. Dan moeten jullie de digitale waarde die jullie binnenkrijgen gemakkelijk kunnen omzetten.
</li>
</ul>
</p>
</div>

***

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht: communicatie tussen 2 ESP' (werk met je gebuurt samen zodat je 2 ESP's hebt)
<ul style="color: white;">
<li>Gebruik op beide de extension shield. </li>
<li>Zorg ervoor dat de 4 drukknoppen van de ene ESP, 4 LED's bedienen op de andere ESP.</li>
<li>Als voorgaande lukt, zorg dat dit in twee richtingen kan, simultaan.</li>
<li>Zorg voor een realtime werking (geen delay !!!)</li>
<li>Door een doordachte code te sturen per button in een continue loop reageren de LEDS direct!!</li>
</ul>
</p>
</div>

***

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht: communicatie tussen ESP en NodeRed-dashboard.
<ul style="color: white;">
<li>Maak een dashboard in Node-Red op de laptop.</li>
<li>Display de waarde van de potentiometer (Gauge) in volt, door de waarde van de potentiometer in een loop door te sturen via een seriële verbinding met de laptop.</li>
<li></li>
</ul>
</p>
</div>

***

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht: communicatie tussen ESP en NodeRed-dashboard 2.
<ul style="color: white;">
<li>Maak een dashboard in Node-Red op de laptop.</li>
<li>Zorg ervoor dat je met 8 mogelijke bedieningen de 8 Leds kan aansturen op de shield</li>
<li>Zorg dat voorgaande met potentiometer (Gauge) ook op deze dashboard staat.</li>
<li>Zorg dat er op de dashboard ook een visualisatie staat van de 4 drukknoppen.</li>
<li>Dus alles op 1 dashboard (bediening 8 leds, visualisatie drukknoppen en potentiometer).</li>
</ul>
</p>
</div>