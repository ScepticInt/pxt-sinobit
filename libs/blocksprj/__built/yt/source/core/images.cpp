#include "pxt.h"

//
//
//
//
//
namespace images {
//
//
//
//
//
//
    Image createImage(ImageLiteral leds) {
        return MicroBitImage(imageBytes(leds)).clone().leakData();
    }

//
//
//
//
//
//
    Image createBigImage(ImageLiteral leds) {
        return createImage(leds);
    }
}

namespace ImageMethods {
//
//
//
//
//
    void plotImage(Image i, int xOffset = 0) {
      uBit.display.print(MicroBitImage(i), -xOffset, 0, 0, 0);
    }

//
//
//
//
//
//
//
    void showImage(Image sprite, int xOffset, int interval = 400) {
      uBit.display.print(MicroBitImage(sprite), -xOffset, 0, 0, interval);
    }

//
//
//
//
//
//
    void plotFrame(Image i, int xOffset) {
      // TODO showImage() used in original implementation
      plotImage(i, xOffset * 5);
    }

//
//
//
//
//
//
//
//
    void scrollImage(Image id, int frameOffset, int interval) {
      MicroBitImage i(id);
      uBit.display.animate(i, interval, frameOffset, MICROBIT_DISPLAY_ANIMATE_DEFAULT_POS, 0);
    }


//
//
//
//
//
    void clear(Image i) {
      MicroBitImage(i).clear();
    }

//
//
//
//
//
    void setPixelBrightness(Image i, int x, int y, int value) {
      MicroBitImage(i).setPixelValue(x, y, value);
    }


//
//
//
//
//
    int pixelBrightness(Image i, int x, int y) {
      int pix = MicroBitImage(i).getPixelValue(x, y);
      if (pix < 0) return 0;
      return pix;
    }


//
//
//
//
    int width(Image i) {
        return i->width;
    }

//
//
//
//
    int height(Image i) {
        return i->height;
    }

//
//
//
//
//
//
//
//
    void setPixel(Image i, int x, int y, bool value) {
        setPixelBrightness(i, x, y, value ? 255 : 0);
    }

//
//
//
//
//
//
//
    bool pixel(Image i, int x, int y) {
        return pixelBrightness(i, x, y) > 0;
    }


//
//
//
//
//
//
    void showFrame(Image i, int frame, int interval = 400) {
        showImage(i, frame * 5, interval);
    }
}

