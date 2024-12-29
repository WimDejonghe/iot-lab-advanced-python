---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

# Gebruik van hardware-timers en hun interrupts

Een nadeel om timers te gebruiken met het principe van millis is dat de tijd niet altijd heel nauwkeurig is. Er kan altijd een kleine fout aanwezig zijn omdat men niet constant vergelijkt. Andere code die de processor uitvoert neemt ook tijd in beslag. Omdat de timer van de controller maar om de 1ms verhoogd wordt kan men ook geen kleinere tijden dan 1ms registreren.

Door gebruik te maken van timer-interrupts kan men veel van de nadelen van het gebruik met millis oplossen. De ESP32 heeft twee hardware-timergroepen. Elke groep heeft twee hardware-timers voor algemeen gebruik, wat wil zeggen dat er in totaal 4 timers zijn. De tellers kunnen zowel op- als aftellen en kunnen automatisch worden herladen. 

::: tip
De frequentie van de teller werkt op 80MHz. Dit wil zeggen dat kleinste tijd van het verhogen van de tellers gelijk is aan 12,5 nanoseconden.
:::

$$ T_{min} = \frac{1} {80Mhz} = 12,5.10^{-9}sec = 12,5 nsec $$

::: details
12,5 nsec (nano seconde) is veel kleiner dan de tijd van millis() die 1 msec is. Natuurlijk is 12,5 nsec in veel gevallen te klein maar daarom kan er gebruik gemaakt worden van een 16 bit prescaler. Door gebruik te maken van de prescaler kan het interval dat de teller verhoogd wordt vergroot worden naar maximum 819,2 μsec (micro seconde).
:::

$$ T_{max} = T_{min}2^{16} = 12,5.10^{-9}sec.65536 = 819,2.10^{-6}sec = 819,2 µsec $$

## Declareren van de timer

Om een timer te gebruiken zal men een pointer declareren van het type hw_timer_t. Een pointer is het adres in het RAM geheugen waar alle instellingen van de timer staan. De naam van de pointer kan je zelf kiezen, bijvoorbeeld:

![Declareren van een timer.](./images/decl.png)

Om een pointer te declareren moet je het sterretje ‘*’ gebruiken en bij het declareren geven we er de waarde NULL aan, wat wil zeggen dat we de ruimte en de naam al bepalen maar nog geen instellingen.

## De timerBegin methode

Het volgende wat meestal gedaan wordt is de methode timerBegin uitvoeren. Deze methode heeft 3 parameters die moeten worden ingesteld. Een voorbeeld is hieronder weergegeven.

![Declareren van een timer.](./images/begin.png)

De eerste parameter is welke van de vier timers er worden gebruikt. Deze waarde kan (0, 1, 2 en 3)zijn. In het voorbeeld wordt timer 0 gebruikt.

De tweede parameter is de waarde van de prescaler. Deze kan tussen 0 en 65536 zijn. Meestal wordt deze ingesteld op 80. Dit wil zeggen dat de tijd tussen het verhogen van de teller 1μsec is. Dit is een waarde om gemakkelijk mee te rekenen en die nog heel klein is om een heel goeie nauwkeurigheid te bekomen.

De derde parameter is een boolean en bepaalt of de teller moet op- of aftellen. True is voor optellen en false is voor aftellen. In het voorbeeld is deze true wat wil zeggen dat deze zal optellen.

## De timerAttachInterrupt methode

Voordat de timer wordt gestart moet er een ISR aan de teller worden gekoppeld. ISR is de afkorting van Interrupts Service Routine. Hier wordt er verteld welke methode er moet worden uitgevoerd bij het genereren van de interrupt.

![De timerAttachInterrupt-methode.](./images/isr.png)

De eerste parameter is de naam van de Timer die je bij de declaratie hebt gegeven. In ons voorbeeld is dit MijnTimer.

De tweede parameter is de methode die moet uitgevoerd worden als de interrupt zich voordoet. Hier is dit de methode onTimer. Het &-teken moet je altijd voor de naam van de methode plaatsen.

De derde parameter moet je altijd op true instellen.

## De timerAlarmWrite methode

De timerAlarmWrite methode stelt de waarde van de teller in wanneer de interrupt gegenereerd moet worden.

![De timerAlarmWrite-methode.](./images/methode.png)

Deze methode heeft 3 parameters. De eerste parameter is de naam van de Timer en is in ons voorbeeld MijnTimer.
De tweede parameter is de waarde van de teller waarbij de interrupt gegenereed moet worden. Als de teller de waarde 1000000 heeft zal de interrupt gegenereerd worden. Dit wil zeggen dat er een tijd verstreken zal zijn van 1 miljoen microseconden wat dus 1 seconde is. De microseconde is bepaald door de prescaler in te stellen op 80.
De derde parameter staat op true wat wil zeggen dat er autorelaod gebruikt wordt van de parameter. Dit wil zeggen dat de teller automatisch bij het genereren van de interrupt op nul gezet wordt en dat de interrupt periodiek gegenereerd zal worden.

## timerAlarmEnable methode

De laatste methode die wordt uitgevoerd is de timer

![De timerAlarmEnable-methode.](./images/enable.png)

Deze methode zorgt ervoor dat aan de timer de interruptmethode wordt gekoppeld.

## Opmerking bij timerinterrupts

Bij geplande uitvoering van code moeten we voorzichtig zijn met de hoeveelheid code en hoelang het duurt om deze uit te voeren.
Als we bijvoorbeeld om de één milliseconde een taak moeten uitvoeren, moet die taak minder dan 1 ms seconde duren om deze uit te voeren, anders loopt de timing te hoog op en loopt het systeem niet synchroon. Zoals in volgende figuur.

![Opletten met timers en de hoeveelheid code die uitgevoerd moet worden.](./images/timer.png)

>- Hoeveel code er is, zal bepalen hoe snel de processorklok moet zijn.
>- We moeten soms prioriteit geven aan de taken. Wordt een taak van 1 ms uitgevoerd voor een taak van 100 ms? (Omdat na 100 ms beide tegelijkertijd willen draaien).
>- Dit betekent ook dat pauze, wachttijd of vertragingen (d.w.z. timingcontrole door ‘polling’)niet kunnen worden gebruikt binnen geplande programmaontwerpen.

## Handige bijkomende methodes op timers

De voorgaande methodes worden het meest gebruikt. Er zijn nog een tal van andere methodes om te gebruiken bij Timers die in deze paragraaf worden uitgelegd.

### timerReadSeconds
Deze methode geeft de waarde van de meegegeven timer terug in seconden in een variabele van het type double.

![De timerReadSecond methode.](./images/tRead.png)

### timerReadMilis
Deze methode geeft de waarde van de meegegeven timer terug in millieseconden in een 64 bit unsigned integer variabele.

![De timerReadMilis methode.](./images/tRead2.png)

### timerReadMicros
Deze methode geeft de waarde van de meegegeven timer terug in microseconden in een 64 bit unsigned integer variabele.

![De timerReadMicros methode.](./images/microS.png)

### timerRead
Deze methode geeft de waarde van de teller terug en plaatst deze in een 64 bit unsigned integer variabele.

![De timerRead methode.](./images/timerRead.png)

### timerWrite
Deze code plaatst de waarde van de teller op een waarde 1000.

![De timerWrite methode.](./images/tWrite.png)

### TimerStart
Deze methode start met het tellen van de timer.

![De timerStart methode.](./images/tStart.png)

### TimerStop
Deze methode stopt met het tellen van de timer.

![De timerStop methode.](./images/tStop.png)

### TimerEnd
Deze methode beïndigd het tellen van de timer.

![De timerStop methode.](./images/tEnd.png)

### timerRestart
Deze methode herstart het tellen van de timer.

![De timerRestart methode.](./images/tRestart.png)

### timerAlarmRead
Deze methode geeft de waarde van de teller terug waar deze een alarm of interrupt genereerd.

![De timerAlarmRead methode.](./images/tAlarmRead.png)

### timerAlarmReadMicros
Deze methode geeft de waarde van de teller in microseconden terug waar deze een alarm of interrupt genereerd.

![De timerAlarmReadMicros methode.](./images/tAlarmReadMicros.png)

### timerAlarmReadSeconds
Deze methode geeft de waarde van de teller in seconden terug waar deze een alarm of interrupt genereerd.

![De timerAlarmReadSeconds methode.](./images/tAlarmReadSeconds.png)

### timerGetDivider
Deze methode geeft de waarde van de prescaler terug.

![De timerGetDivider methode.](./images/tGetDivider.png)

### timerGetCountUp
Deze methode geeft de telrichting van de timer terug. True is optellen en false is aftellen.

![De timerGetCountUp methode.](./images/tGetCountUp.png)

### timerGetAutoReload
Deze methode geeft de waarde true terug als de timer periodiek wordt herladen als er zich een interrupt voordoet. Indien niet wordt de waarde false teruggegeven.

![De timerGetAutoReload methode.](./images/tGetAutoReload.png)

### timerAlarmDisable
Deze methode schakelt de interrupt op de timer uit.

![De timerAlarmDisable methode.](./images/tAlarmDisable.png)

### timerAlarmEnabled
Deze methode geeft weer of er een interrupt of een alarm is gekoppeld aan de timer of niet. Bij true is er een interrupt gekoppeld en bij false niet.

![De timerAlarmEnabled methode.](./images/tAlarmEnabled.png)

### timerDetachInterrupt
Deze methode koppelt de interruptroutine los van de timer.

![De timerDetachInterrupt methode.](./images/tDetachInterrupt.png)

## Een knipperende led door gebruik te maken van interrupts
Het voorbeeld laat een led knipperen die standaard op de ESP32 feather van Adafruit staat. De led knippert met een frequentie van 0,5Hz.

### Schema

![Schema van een knipperende led.](./images/schema.png)

### Flowchart

Bij de declaratie (1) wordt er een constante aangemaakt met de naam LED die gelijkgesteld wordt aan 13. LED is de naam van de uitgang en 13 is de pinnummer waarmee de led is verbonden.
Bij de declaratie declareren we ook een timer die de naam MijnTimer heeft en die van het type hw_timer_t is.
In de setup-methode (2) wordt de IO-pin waarmee de LED is verbonden ingesteld als uitgang en wordt de timer 0 gebruikt die men laat optellen met een tijd van 1μs. Dit wordt gedaan door de prescaler in te stellen op 80. Vervolgens wordt er een interruptroutine aan de timer gekoppeld die de naam ‘onTimer’ heeft. De timer wordt automatisch opnieuw ingesteld bij het bereiken van de interrupt zodat deze periodiek wordt uitgevoerd.
Daarna wordt de alarmwaarde om de interruptroutine op te roepen ingesteld op 1000000 dat gelijk staat aan 1 seconde.
Als laatste wordt de timer en de interupt gestart.
In de loop-methode (3) wordt er niets uitgevoerd omdat alles verloopt via een interrupt. Om de seconde zal de interruptroutine ‘onTimer’ uitgevoerd worden. Waarvan de huidige toestand van de led wordt gelezen. Deze wordt geïnverteerd en tenslotte weer naar de LED gestuurd.

![Schema van een knipperende led.](./images/fc.png)

### Software code

![Schema van een knipperende led.](./images/code.png)

## Opdracht:

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht: Blokgolf met interrupt timers (1kHz)
<ul style="color: white;">
<li>Schrijf een programma die een blokgolfspanning op een uitgang genereert met een frequentie van 1kHz en een duty-cycle van 50%.
</li>
<li>Knipperled (tweede LED gebruiken) maken in de Loop-methode op een periode van 250ms. Hiermee toon je de onafhankelijkheid van de ISR aan tov. de standaard Loop-methode.
</li>
<li>Meet, controlleer en visualiseer het signaal met een oscilloscoop</li>
<li>Toon de werking aan de docent</li>
<li>Bespreek de werking van harware en software in het verslag</li>
</ul>
</p>
</div>



