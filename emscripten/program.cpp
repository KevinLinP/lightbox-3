#include "FastLED-3.5.0/src/FastLED_wasm.h"

#define WIDTH 9
#define HEIGHT 7
#define NUM_LEDS 63

CHSV leds[NUM_LEDS];
CRGB leds_rgb[NUM_LEDS];
bool directions[NUM_LEDS];
char speed[NUM_LEDS];

uint8_t random_speed() {
  return random8() % 2 + 2;
}

void random_fill() {
  for(int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CHSV(0, 0, random8());
    directions[i] = random8() >= 128;
    speed[i] = random_speed();
  }
}

void random_on_fade_off() {
  for(int i = 0; i < NUM_LEDS; i++) {
    uint8_t previous_value = leds[i].value;
    leds[i].value -= speed[i];

    if (leds[i].value > previous_value) {
      speed[i] = random_speed();
    }
  }
}

extern "C" {
  uint8_t get_width() { 
    return WIDTH;
  }
  uint8_t get_height() {
    return HEIGHT;
  }
  CRGB * get_leds_pointer() { 
    return leds_rgb;
  }

  void setup() { 
    /* random_fill(); */

    hsv2rgb_rainbow(leds, leds_rgb, NUM_LEDS);
  }

  void loop() {
    /* random_on_fade_off(); */

    hsv2rgb_rainbow(leds, leds_rgb, NUM_LEDS);
  }
}

