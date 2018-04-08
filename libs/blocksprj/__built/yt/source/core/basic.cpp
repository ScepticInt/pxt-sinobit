#include "pxt.h"


//
//
//
//
namespace basic {

//
//
//
//
//
//
//
//
//
    void showNumber(int value, int interval = 150) {
      if (interval <= 0)
        interval = 1;
      ManagedString t(value);
      if (value < 0 || value >= 10) {
        uBit.display.scroll(t, interval);
      } else {
        uBit.display.printChar(t.charAt(0), interval * 5);
      }
    }

//
//
//
//
//
//
//
//
//
//
//
    void showLeds(ImageLiteral leds, int interval = 400) {
      uBit.display.print(MicroBitImage(imageBytes(leds)), 0, 0, 0, interval);
    }

//
//
//
//
//
//
//
//
//
//
//
    void showString(StringData *text, int interval = 150) {
      if (interval <= 0)
        interval = 1;
      ManagedString s(text);
      int l = s.length();
      if (l == 0) {
        uBit.display.clear();
        fiber_sleep(interval * 5);
      } else if (l > 1) {
        uBit.display.scroll(s, interval);
      } else {
        uBit.display.print(s.charAt(0), interval * 5);
      }
    }

//
//
//
//
//
//
//
    void clearScreen() {
      uBit.display.image.clear();
    }

//
//
//
//
//
//
//
    void showAnimation(ImageLiteral leds, int interval = 400) {
      uBit.display.animate(MicroBitImage(imageBytes(leds)), interval, 5, 0, 0);
    }

//
//
//
//
//
//
    void plotLeds(ImageLiteral leds) {
      MicroBitImage i(imageBytes(leds));
      uBit.display.print(i, 0, 0, 0, 0);
    }

    void forever_stub(void *a) {
      while (true) {
        runAction0((Action)a);
        fiber_sleep(20);
      }
    }

//
//
//
//
//
//
    void forever(Action a) {
      if (a != 0) {
        incr(a);
        create_fiber(forever_stub, (void*)a);
      }
    }

//
//
//
//
//
//
//
    void pause(int ms) {
      fiber_sleep(ms);
    }
}

