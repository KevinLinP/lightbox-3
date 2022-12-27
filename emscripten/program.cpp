#include "FastLED-3.5.0/src/FastLED_wasm.h"

#define NUM_LEDS 2

extern "C" {
  CRGB leds[NUM_LEDS];

  CRGB * loop() {
    leds[0] = CRGB::Blue;
    leds[1] = CRGB::Green;

    return leds;
  }
}

