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



