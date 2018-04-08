#include "pxt.h"

enum class DisplayMode_ {
    //% block="black and white"
    BackAndWhite = DISPLAY_MODE_BLACK_AND_WHITE,
    //% block="greyscale"
    Greyscale = DISPLAY_MODE_GREYSCALE,
    // TODO DISPLAY_MODE_BLACK_AND_WHITE_LIGHT_SENSE
};

//
namespace led {

//
//
//
//
//
//
//
//
//
    void plot(int x, int y) {
      uBit.display.image.setPixelValue(x, y, 0xff);
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
    void plotBrightness(int x, int y, int brightness) {
        brightness = max(0, min(0xff, brightness));
        // enable greyscale as needed
        if (brightness != 0 && brightness != 0xff && uBit.display.getDisplayMode() != DISPLAY_MODE_GREYSCALE)
            uBit.display.setDisplayMode(DISPLAY_MODE_GREYSCALE);
        uBit.display.image.setPixelValue(x, y, brightness);
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
    void unplot(int x, int y) {
      uBit.display.image.setPixelValue(x, y, 0);
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
    bool point(int x, int y) {
      int pix = uBit.display.image.getPixelValue(x, y);
      return pix > 0;
    }

//
//
//
//
//
//
//
    int brightness() {
      return uBit.display.getBrightness();
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
    void setBrightness(int value) {
       uBit.display.setBrightness(value);
    }

//
//
//
//
//
//
//
    void stopAnimation() {
       uBit.display.stopAnimation();
    }

//
//
//
//
//
//
    void setDisplayMode(DisplayMode_ mode) {
        uBit.display.setDisplayMode((DisplayMode)mode);
    }

//
//
//
//
    DisplayMode_ displayMode() {
        return (DisplayMode_)uBit.display.getDisplayMode();
    }

//
//
//
//
//
    void enable(bool on) {
        if (on) uBit.display.enable();
        else uBit.display.disable();
    }

//
//
//
//
//
    Image screenshot() {
      return uBit.display.screenShot().leakData();
        /*
        let Image img;
        img = image.createImage("");
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (led.point(i, j)) {
                    img.setPixel(i, j, true);
                }
            }
        }
        return img;
        */
    }
}

