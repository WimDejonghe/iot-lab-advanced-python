---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

# I²C met de ESP32

De ESP32 ondersteunt I²C communicatie door gebruik te maken van twee I²C bussen die zowel als master of als slave gebruikt kunnen worden afhenkelijk van de instellingen van de gebruiker.
De I²C bussen ondersteunen:
> - Standard mode (100 kbit/s)
> - Fast mode (400 kbit/s)
> - Tot 5MHz
> - 7 bit/10 bit adressen

:::warning
Bij de ESP32 feather van Adafruit zijn de pull-up weerstanden niet voorzien en deze moeten zelf hardwarematig geplaatst worden (2,4k).
:::

In de volgende figuur zijn de digitale IO-pinnen afgebeeld. Standaard wordt er bij de feather van Adafruit pin 22 gebruikt als SCL en pin 23 als SDA. Je bent daar niet aan gebonden maar je kan gemakkelijk andere pinnen gebruiken door dit te configureren.

![De digitale IO-pinnen van de Adafruit Huzzah ESP32 feather.](./images/esp.png)
![De digitale IO-pinnen van de Adafruit Huzzah ESP32 feather.](./images/esp32.png)

In dit deel komen volgende items aan bod:
> - De I²C bus scannen
> - Lezen en schrijven van I²C data
> - Het connecteren van meerdere devices (slaves) op de bus.

:::warning
Hier wordt de ESP32 gebruikt als I²C master, wat in werkelijk ook meestal zo zal zijn. Het is echter mogelijk om de ESP32 als slave te configureren op een I²C bus met een andere master. Er is meestal ook maar één master die de bus onder zijn beheer het dataverkeer erop, laat gebeuren.
:::

## MicroPython Methods voor I²C

Er bestaan heel wat methodes die kunnen gebruikt worden voor de I²C bus communicatie. Hier enkele voorbeelden:

```python
i2c = I2C(0) # Default statement to declare an i2c object of the I2C class.
i2c.scan()   #Scan for peripherals, and returns a list of 7-bit addresses.
i2c.writeto(42, b'123') #Write 3 bytes to the device. The device’s address is 42.
i2c.readfrom(0x3a, 4) # Read 4 bytes from the peripheral that has a 7-bit address of 0x3a.
i2c.start()   #Generate a START condition on the bus.
i2c.stop() #Generate a STOP condition on the bus.
```

## Scannen I²C devices
Omdat I²C-apparaten unieke adressen hebben, zal het kennen van hun adressen ons helpen om met een of meer apparaten te communiceren. Het scannen van I²C-apparaten helpt ook om te weten of de bedrading correct is.

Beschouw het voorbeeld van een microcontroller die is aangesloten op een sensor die via I²C kan communiceren. We kunnen de volgende code gebruiken om het I²C-adres van de sensor te scannen.

```python
import machine
sdaPIN=machine.Pin(0)
sclPIN=machine.Pin(1)
i2c=machine.I2C(0,sda=sdaPIN, scl=sclPIN, freq=400000)
devices = i2c.scan()
if len(devices) != 0:
    print('Number of I2C devices found=',len(devices))
    for device in devices:
        print("Device Hexadecimel Address= ",hex(device))
else:
    print("No device found")
```

Het voorbeeld in de vorige sectie hierboven laat zien hoe u deze code kunt gebruiken om I²C-apparaten te scannen. Als er meerdere apparaten op een I²C-bus zijn aangesloten, worden de adressen van elk apparaat afgedrukt.

## I²C example BME-280 slave

Laten we een eenvoudig voorbeeld proberen van hoe sensoren kunnen worden gekoppeld aan een ESP32-ontwikkelbord met behulp van I²C- en MicroPython-code.

Zorg er eerst voor dat de MicroPython-firmware naar uw ESP32 is geflasht. Onze handleidingen voor het flashen en uitvoeren van MicroPython op ESP32 met behulp van Thonny IDE en aan de slag gaan met ESP32 op Thonny IDE zijn nuttige bronnen.

ESP32 heeft twee hardware I²C-modules die worden gemultiplext naar de GPIO's. In dit voorbeeld wordt de BME280-omgevingssensor gebruikt om te demonstreren hoe we met behulp van I²C gegevens van een sensor kunnen lezen.

BME280 is een 3-in-één omgevingssensor van Bosch Sensortech. Het voert digitale gegevens uit met informatie over temperatuur, druk en vochtigheid. Het is algemeen verkrijgbaar in de vorm van breakout-bordmodules. De GY-BME280-module wordt geleverd met 4 pinnen voor aansluiting zoals hieronder weergegeven.

![Het versturen van een aantal bytes naar een slave.](./images/bme280.png)

## Bedrading BME-280

Dit project maakt gebruik van een ESP-WROOM-32-ontwikkelbord, maar je kunt elk ander bord kiezen. Houd er rekening mee dat de gebruikte pinnen kunnen verschillen voor andere ESP32-kaarten!!

![Het versturen van een aantal bytes naar een slave.](./images/bme280_2.png)

:warning: **Warning:** Let op, bij de Adafruit ESP32 feather liggen alle pinnen op andere plaatsen en op andere nummers!!

| ESP32 Pin | BME280 Pin | 
| --------------- | --------------- |
| GPIO 22 | SDA |
| GPIO 23 | SCL | 
| 3V3 | VIN | 
| GND | GND |



## Scan (zoek) I²C slave adres

Nadat u GPIO22 en GPIO23 van ESP32 hebt aangesloten op respectievelijk de BME280 SDA- en SDA-pinnen, voert u de volgende MicroPython-code uit om het adres van de BME280-sensor te scannen en te vinden:

```python
# Import the machine module for hardware access
import machine

# Initialize the SDA pin for I2C communication
sdaPIN = machine.Pin(22)

# Initialize the SCL pin for I2C communication
sclPIN = machine.Pin(23)

# Initialize the I2C interface with the specified pins and frequency
i2c = machine.I2C(0, sda=sdaPIN, scl=sclPIN, freq=400000)

# Scan for devices connected to the I2C bus
devices = i2c.scan()

# Check if any devices are found
if len(devices) == 0:
    # If no devices are found, print a message
    print("No I2C devices found!")
else:
    # If devices are found, print the number of devices found
    print('I2C devices found:', len(devices))
    # Iterate through each device found and print its hexadecimal address
    for device in devices:
        print("Hexadecimal address:", hex(device))
```
De onderstaande schermafbeelding demonstreert de uitvoer in de shell van Thonny IDE en toont het hexadecimale adres van de BME280 dat na het scannen is gevonden.

****************************************************************** 
------------------------------------------------------------------



```cpp
#include <Wire.h>
#define I2C_SDA 23
#define I2C_SCL 22
```
## Schrijven van een byte naar een slave

Om een byte te schrijven naar een slave moeten er drie methodes uitgevoerd worden, namelijk:
>- Een beginTransmission waarbij de startcuclus gegenereerd wordt en het adres van de slave wordt meegegeven waarna een byte zal worden geschreven.
>- De te schrijven byte met de methode write.
>- Het eindigen van de communicatie waar de stopcyclus wordt gegenereerd.

```cpp
void loop() 
{
  Wire.beginTransmission(0x20);
  Wire.write(0xAA);
  Wire.endTransmission();
  delay(250);
  Wire.beginTransmission(0x20);
  Wire.write(0x55);
  Wire.endTransmission();
  delay(250);
 }
```
## Schrijven van een aantal bytes naar een slave

Om een aantal bytes te schrijven naar een slave is het handig om de bytes te plaatsen in een array van bytes (= lijn 33 tot en met lijn 37).
Vervolgens worden er terug gestart met de beginTransmission methode (lijn 39) en geëindigd met de endTransmission methode (= lijn 41).
Om de bytes te versturen wordt de methode write gebruikt zoals in lijn 40 van onderstaande figuur. Het eerste argument is de array waaruit de data moet opgehaald worden en de tweede byte is het aantal te versturen bytes.

![Het versturen van een aantal bytes naar een slave.](./images/code.png)

## Lezen van een byte van een slave

Om een byte te lezen van een slave wordt de methode requestFrom gebruikt waarbij het eerste argument het adres is van de slave waarvan gelezen wil worden. Het tweede argument is het aantal bytes die men wil lezen en is hier natuurlijk 1. Het derde argument is optioneel en geeft weer dat er na het ontvangen een stopcyclus verstuurd moet worden of niet (lijn 32 en 36). Als men geen stopcyclus via deze methode verstuurt, dan kan die wel verstuurd worden met de methode endTransmission zoals op lijn 38.

![Lezen van een byte van een slave.](./images/code2.png)

## Lezen van meerdere bytes van een slave

Als men meerdere bytes wil lezen gebruikt men de requestFrom methode waarbij men als tweede argument het aantal bytes weergeeft (lijn 32).
Vervolgens zal men in een while-lus controleren of de bytes ontvangen zijn (lijn 33). Als er bytes ontvangen zijn zal men deze lezen door de functiemethode read te gebruiken.

![Het lezen van meerdere bytes van een slave.](./images/code3.png)

## Een I²C slave maken met een ESP32

Om een I²C slave te maken wordt er een aantal constanten aangemaakt waaronder het adres van de slave, de gebruikte SDA en SCL pinnen van de I²C-bus (lijn 28, 29 en 30).
Vervolgens is het belangrijk dat de slave geïnitialiseerd wordt door de methode begin aan te roepen waarbij het adres en de gebruikte communicatiepinnen worden meegegeven (lijn 33).
Vervolgens wordt de kloksnelheid ingesteld (lijn 36).
Als laatste wordt de interruptroutine meegegeven die moet uitgevoerd worden als er gevraagd wordt om te communcieren (lijn 39).
De interruptroutine staat op lijn 19 t.e.m. 23. Waarbij de slave, onze controller, 5 bytes verstuurd met de tekst ‘Hallo’. Wat er verstuurd moet worden zal afhankelijk zijn van wat de master wil.

![Voorbeeldprogramma van een slave.](./images/slave.png)

> :memo: **Note:** In de meeste gevallen zal de ESP32 gebruikt worden als MASTER en niet als SLAVE binnen een I²C bus. Met gevolg dat vorige code in labo toepassingen niet zal gebruikt worden.

## Voorbeeld: scannen van een I²C-bus

Het onderstaande voorbeeld is een programma die handig kan zijn om alle adressen van de slave te weten die op een bus aanwezig zijn.

![Scannen van een I²C-bus.](./images/scan1.png)
![Scannen van een I²C-bus.](./images/scan2.png)



