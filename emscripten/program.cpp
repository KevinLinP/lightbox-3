#include "FastLED-3.5.0/src/FastLED_wasm.h"
/* #include "FastLED-3.5.0/src/hsv2rgb.h" */

#define NUM_LEDS 3

extern "C" {
  CHSV leds[NUM_LEDS];
  CRGB leds_rgb[NUM_LEDS];

  CRGB * setup() { 
    leds[0] = CHSV(0, 255, 255);
    leds[1] = CHSV(85, 255, 255);
    leds[2] = CHSV(190, 255, 255);

    return leds_rgb;
  }

  void loop() {
    for(int i = 0; i < NUM_LEDS; i++) {
      leds[i].hue += 1;
    }

    hsv2rgb_rainbow(leds, leds_rgb, NUM_LEDS);
  }
}

