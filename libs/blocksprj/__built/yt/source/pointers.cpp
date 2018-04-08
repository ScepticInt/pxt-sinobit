#include "pxt.h"
#include "source/ManagedBuffer.h"
#include "source/pxt.h"
namespace pxt {
    typedef ImageData* Image;
    typedef BufferData* Buffer;
}
namespace String_ {
    StringData* charAt(StringData *s, int pos);
    int charCodeAt(StringData *s, int index);
    StringData* concat(StringData *s, StringData *other);
    int compare(StringData *s, StringData *that);
    int compareDecr(StringData *s, StringData *that);
    int length(StringData *s);
    StringData* fromCharCode(int code);
    int toNumber(StringData *s);
    StringData* mkEmpty();
    StringData* substr(StringData *s, int start, int length);
}
namespace Boolean_ {
    StringData* toString(bool v);
    bool bang(int v);
}
namespace Number_ {
    StringData* toString(int n);
    bool lt(int x, int y);
    bool le(int x, int y);
    bool neq(int x, int y);
    bool eq(int x, int y);
    bool gt(int x, int y);
    bool ge(int x, int y);
    int div(int x, int y);
    int mod(int x, int y);
    bool eqDecr(int x, int y);
}
namespace Math_ {
    int pow(int x, int y);
    int random(int max);
    int sqrt(int x);
}
namespace Array_ {
    RefCollection* mk(uint32_t flags);
    int length(RefCollection *c);
    void setLength(RefCollection *c, int newLength);
    void push(RefCollection *c, uint32_t x);
    uint32_t pop(RefCollection *c);
    uint32_t getAt(RefCollection *c, int x);
    void setAt(RefCollection *c, int x, uint32_t y);
    uint32_t removeAt(RefCollection *c, int x);
    void insertAt(RefCollection *c, int x, uint32_t value);
    int indexOf(RefCollection *c, uint32_t x, int start);
    int removeElement(RefCollection *c, uint32_t x);
}
namespace pxt {
    void registerWithDal(int id, int event, Action a);
    uint32_t runAction3(Action a, int arg0, int arg1, int arg2);
    uint32_t runAction2(Action a, int arg0, int arg1);
    uint32_t runAction1(Action a, int arg0);
    uint32_t runAction0(Action a);
    Action mkAction(int reflen, int totallen, int startptr);
    RefRecord* mkClassInstance(int offset);
    void RefRecord_destroy(RefRecord *r);
    void RefRecord_print(RefRecord *r);
    void debugMemLeaks();
    int incr(uint32_t e);
    void decr(uint32_t e);
    uint32_t* allocate(uint16_t sz);
    int templateHash();
    int programHash();
    void* ptrOfLiteral(int offset);
    int getNumGlobals();
    uint32_t programSize();
    uint32_t afterProgramPage();
}
namespace pxtrt {
    uint32_t ldloc(RefLocal *r);
    uint32_t ldlocRef(RefRefLocal *r);
    void stloc(RefLocal *r, uint32_t v);
    void stlocRef(RefRefLocal *r, uint32_t v);
    RefLocal* mkloc();
    RefRefLocal* mklocRef();
    uint32_t ldfld(RefRecord *r, int idx);
    uint32_t ldfldRef(RefRecord *r, int idx);
    void stfld(RefRecord *r, int idx, uint32_t val);
    void stfldRef(RefRecord *r, int idx, uint32_t val);
    RefAction* stclo(RefAction *a, int idx, uint32_t v);
    void panic(int code);
    int stringToBool(StringData *s);
    StringData* emptyToNull(StringData *s);
    int ptrToBool(uint32_t p);
    RefMap* mkMap();
    uint32_t mapGet(RefMap *map, uint32_t key);
    uint32_t mapGetRef(RefMap *map, uint32_t key);
    void mapSet(RefMap *map, uint32_t key, uint32_t val);
    void mapSetRef(RefMap *map, uint32_t key, uint32_t val);
    void* getGlobalsPtr();
    void runtimeWarning(StringData *s);
}
namespace images {
    Image createImage(ImageLiteral leds);
    Image createBigImage(ImageLiteral leds);
}
namespace ImageMethods {
    void plotImage(Image i, int xOffset = 0);
    void showImage(Image sprite, int xOffset, int interval = 400);
    void plotFrame(Image i, int xOffset);
    void scrollImage(Image id, int frameOffset, int interval);
    void clear(Image i);
    void setPixelBrightness(Image i, int x, int y, int value);
    int pixelBrightness(Image i, int x, int y);
    int width(Image i);
    int height(Image i);
    void setPixel(Image i, int x, int y, bool value);
    bool pixel(Image i, int x, int y);
    void showFrame(Image i, int frame, int interval = 400);
}
namespace basic {
    void showNumber(int value, int interval = 150);
    void showLeds(ImageLiteral leds, int interval = 400);
    void showString(StringData *text, int interval = 150);
    void clearScreen();
    void showAnimation(ImageLiteral leds, int interval = 400);
    void plotLeds(ImageLiteral leds);
    void forever(Action a);
    void pause(int ms);
}
    enum Button : int;
    enum Dimension : int;
    enum Rotation : int;
    enum TouchPin : int;
    enum AcceleratorRange : int;
    enum Gesture : int;
    enum MesDpadButtonInfo : int;
namespace input {
    void onButtonPressed(Button button, Action body);
    void onGesture(Gesture gesture, Action body);
    void onPinPressed(TouchPin name, Action body);
    void onPinReleased(TouchPin name, Action body);
    bool buttonIsPressed(Button button);
    bool pinIsPressed(TouchPin name);
    int acceleration(Dimension dimension);
    int lightLevel();
    int compassHeading();
    int temperature();
    int rotation(Rotation kind);
    int magneticForce(Dimension dimension);
    int runningTime();
    int runningTimeMicros();
    void calibrateCompass();
    void setAccelerometerRange(AcceleratorRange range);
}
    enum EventCreationMode : int;
    enum EventBusSource : int;
    enum EventBusValue : int;
namespace control {
    void inBackground(Action a);
    void reset();
    void waitMicros(int micros);
    void raiseEvent(int src, int value, EventCreationMode mode);
    void onEvent(int src, int value, Action handler);
    int eventValue();
    int eventTimestamp();
    StringData* deviceName();
    int deviceSerialNumber();
}
    enum DisplayMode_ : int;
namespace led {
    void plot(int x, int y);
    void plotBrightness(int x, int y, int brightness);
    void unplot(int x, int y);
    bool point(int x, int y);
    int brightness();
    void setBrightness(int value);
    void stopAnimation();
    void setDisplayMode(DisplayMode_ mode);
    DisplayMode_ displayMode();
    void enable(bool on);
    Image screenshot();
}
    enum DigitalPin : int;
    enum AnalogPin : int;
    enum PulseValue : int;
    enum PinPullMode : int;
    enum PinEventType : int;
namespace pins {
    MicroBitPin* getPinAddress(int id);
    int digitalReadPin(DigitalPin name);
    void digitalWritePin(DigitalPin name, int value);
    int analogReadPin(AnalogPin name);
    void analogWritePin(AnalogPin name, int value);
    void analogSetPeriod(AnalogPin name, int micros);
    void onPulsed(DigitalPin name, PulseValue pulse, Action body);
    int pulseDuration();
    int pulseIn(DigitalPin name, PulseValue value, int maxDuration = 2000000);
    void servoWritePin(AnalogPin name, int value);
    void servoSetPulse(AnalogPin name, int micros);
    void analogSetPitchPin(AnalogPin name);
    void analogPitch(int frequency, int ms);
    void setPull(DigitalPin name, PinPullMode pull);
    void setEvents(DigitalPin name, PinEventType type);
    Buffer createBuffer(int size);
    Buffer i2cReadBuffer(int address, int size, bool repeat = false);
    void i2cWriteBuffer(int address, Buffer buf, bool repeat = false);
    int spiWrite(int value);
    void spiFrequency(int frequency);
    void spiFormat(int bits, int mode);
    void spiPins(DigitalPin mosi, DigitalPin miso, DigitalPin sck);
}
    enum SerialPin : int;
    enum BaudRate : int;
    enum Delimiters : int;
namespace serial {
    StringData* readUntil(StringData* delimiter);
    StringData* readString();
    void onDataReceived(StringData* delimiters, Action body);
    void writeString(StringData *text);
    void writeBuffer(Buffer buffer);
    Buffer readBuffer(int length);
    void redirect(SerialPin tx, SerialPin rx, BaudRate rate);
    void redirectToUSB();
}
    enum NumberFormat : int;
namespace BufferMethods {
    int getByte(Buffer buf, int off);
    void setByte(Buffer buf, int off, int v);
    uint8_t* getBytes(Buffer buf);
    void setNumber(Buffer buf, NumberFormat format, int offset, int value);
    int getNumber(Buffer buf, NumberFormat format, int offset);
    int length(Buffer s);
    void fill(Buffer buf, int value, int offset = 0, int length = -1);
    Buffer slice(Buffer buf, int offset = 0, int length = -1);
    void shift(Buffer buf, int offset, int start = 0, int length = -1);
    void rotate(Buffer buf, int offset, int start = 0, int length = -1);
    void write(Buffer buf, int dstOffset, Buffer src);
}
namespace radio {
    void sendNumber(int value);
    void sendValue(StringData* name, int value);
    void sendString(StringData* msg);
    void writeValueToSerial();
    void writeReceivedPacketToSerial();
    int receiveNumber();
    void onDataReceived(Action body);
    StringData* receiveString();
    int receivedSignalStrength();
    void setGroup(int id);
    void setTransmitPower(int power);
    void setTransmitSerialNumber(bool transmit);
    int receivedNumber();
    uint32_t receivedSerial();
    StringData* receivedString();
    uint32_t receivedTime();
}

PXT_SHIMS_BEGIN
(uint32_t)(void*)::String_::charAt,
(uint32_t)(void*)::String_::charCodeAt,
(uint32_t)(void*)::String_::concat,
(uint32_t)(void*)::String_::compare,
(uint32_t)(void*)::String_::compareDecr,
(uint32_t)(void*)::String_::length,
(uint32_t)(void*)::String_::fromCharCode,
(uint32_t)(void*)::String_::toNumber,
(uint32_t)(void*)::String_::mkEmpty,
(uint32_t)(void*)::String_::substr,
(uint32_t)(void*)::Boolean_::toString,
(uint32_t)(void*)::Boolean_::bang,
(uint32_t)(void*)::Number_::toString,
(uint32_t)(void*)::Number_::lt,
(uint32_t)(void*)::Number_::le,
(uint32_t)(void*)::Number_::neq,
(uint32_t)(void*)::Number_::eq,
(uint32_t)(void*)::Number_::gt,
(uint32_t)(void*)::Number_::ge,
(uint32_t)(void*)::Number_::div,
(uint32_t)(void*)::Number_::mod,
(uint32_t)(void*)::Number_::eqDecr,
(uint32_t)(void*)::Math_::pow,
(uint32_t)(void*)::Math_::random,
(uint32_t)(void*)::Math_::sqrt,
(uint32_t)(void*)::Array_::mk,
(uint32_t)(void*)::Array_::length,
(uint32_t)(void*)::Array_::setLength,
(uint32_t)(void*)::Array_::push,
(uint32_t)(void*)::Array_::pop,
(uint32_t)(void*)::Array_::getAt,
(uint32_t)(void*)::Array_::setAt,
(uint32_t)(void*)::Array_::removeAt,
(uint32_t)(void*)::Array_::insertAt,
(uint32_t)(void*)::Array_::indexOf,
(uint32_t)(void*)::Array_::removeElement,
(uint32_t)(void*)::pxt::registerWithDal,
(uint32_t)(void*)::pxt::runAction3,
(uint32_t)(void*)::pxt::runAction2,
(uint32_t)(void*)::pxt::runAction1,
(uint32_t)(void*)::pxt::runAction0,
(uint32_t)(void*)::pxt::mkAction,
(uint32_t)(void*)::pxt::mkClassInstance,
(uint32_t)(void*)::pxt::RefRecord_destroy,
(uint32_t)(void*)::pxt::RefRecord_print,
(uint32_t)(void*)::pxt::debugMemLeaks,
(uint32_t)(void*)::pxt::incr,
(uint32_t)(void*)::pxt::decr,
(uint32_t)(void*)::pxt::allocate,
(uint32_t)(void*)::pxt::templateHash,
(uint32_t)(void*)::pxt::programHash,
(uint32_t)(void*)::pxt::ptrOfLiteral,
(uint32_t)(void*)::pxt::getNumGlobals,
(uint32_t)(void*)::pxt::programSize,
(uint32_t)(void*)::pxt::afterProgramPage,
(uint32_t)(void*)::pxtrt::ldloc,
(uint32_t)(void*)::pxtrt::ldlocRef,
(uint32_t)(void*)::pxtrt::stloc,
(uint32_t)(void*)::pxtrt::stlocRef,
(uint32_t)(void*)::pxtrt::mkloc,
(uint32_t)(void*)::pxtrt::mklocRef,
(uint32_t)(void*)::pxtrt::ldfld,
(uint32_t)(void*)::pxtrt::ldfldRef,
(uint32_t)(void*)::pxtrt::stfld,
(uint32_t)(void*)::pxtrt::stfldRef,
(uint32_t)(void*)::pxtrt::stclo,
(uint32_t)(void*)::pxtrt::panic,
(uint32_t)(void*)::pxtrt::stringToBool,
(uint32_t)(void*)::pxtrt::emptyToNull,
(uint32_t)(void*)::pxtrt::ptrToBool,
(uint32_t)(void*)::pxtrt::mkMap,
(uint32_t)(void*)::pxtrt::mapGet,
(uint32_t)(void*)::pxtrt::mapGetRef,
(uint32_t)(void*)::pxtrt::mapSet,
(uint32_t)(void*)::pxtrt::mapSetRef,
(uint32_t)(void*)::pxtrt::getGlobalsPtr,
(uint32_t)(void*)::pxtrt::runtimeWarning,
(uint32_t)(void*)::images::createImage,
(uint32_t)(void*)::images::createBigImage,
(uint32_t)(void*)::ImageMethods::plotImage,
(uint32_t)(void*)::ImageMethods::showImage,
(uint32_t)(void*)::ImageMethods::plotFrame,
(uint32_t)(void*)::ImageMethods::scrollImage,
(uint32_t)(void*)::ImageMethods::clear,
(uint32_t)(void*)::ImageMethods::setPixelBrightness,
(uint32_t)(void*)::ImageMethods::pixelBrightness,
(uint32_t)(void*)::ImageMethods::width,
(uint32_t)(void*)::ImageMethods::height,
(uint32_t)(void*)::ImageMethods::setPixel,
(uint32_t)(void*)::ImageMethods::pixel,
(uint32_t)(void*)::ImageMethods::showFrame,
(uint32_t)(void*)::basic::showNumber,
(uint32_t)(void*)::basic::showLeds,
(uint32_t)(void*)::basic::showString,
(uint32_t)(void*)::basic::clearScreen,
(uint32_t)(void*)::basic::showAnimation,
(uint32_t)(void*)::basic::plotLeds,
(uint32_t)(void*)::basic::forever,
(uint32_t)(void*)::basic::pause,
(uint32_t)(void*)::input::onButtonPressed,
(uint32_t)(void*)::input::onGesture,
(uint32_t)(void*)::input::onPinPressed,
(uint32_t)(void*)::input::onPinReleased,
(uint32_t)(void*)::input::buttonIsPressed,
(uint32_t)(void*)::input::pinIsPressed,
(uint32_t)(void*)::input::acceleration,
(uint32_t)(void*)::input::lightLevel,
(uint32_t)(void*)::input::compassHeading,
(uint32_t)(void*)::input::temperature,
(uint32_t)(void*)::input::rotation,
(uint32_t)(void*)::input::magneticForce,
(uint32_t)(void*)::input::runningTime,
(uint32_t)(void*)::input::runningTimeMicros,
(uint32_t)(void*)::input::calibrateCompass,
(uint32_t)(void*)::input::setAccelerometerRange,
(uint32_t)(void*)::control::inBackground,
(uint32_t)(void*)::control::reset,
(uint32_t)(void*)::control::waitMicros,
(uint32_t)(void*)::control::raiseEvent,
(uint32_t)(void*)::control::onEvent,
(uint32_t)(void*)::control::eventValue,
(uint32_t)(void*)::control::eventTimestamp,
(uint32_t)(void*)::control::deviceName,
(uint32_t)(void*)::control::deviceSerialNumber,
(uint32_t)(void*)::led::plot,
(uint32_t)(void*)::led::plotBrightness,
(uint32_t)(void*)::led::unplot,
(uint32_t)(void*)::led::point,
(uint32_t)(void*)::led::brightness,
(uint32_t)(void*)::led::setBrightness,
(uint32_t)(void*)::led::stopAnimation,
(uint32_t)(void*)::led::setDisplayMode,
(uint32_t)(void*)::led::displayMode,
(uint32_t)(void*)::led::enable,
(uint32_t)(void*)::led::screenshot,
(uint32_t)(void*)::pins::getPinAddress,
(uint32_t)(void*)::pins::digitalReadPin,
(uint32_t)(void*)::pins::digitalWritePin,
(uint32_t)(void*)::pins::analogReadPin,
(uint32_t)(void*)::pins::analogWritePin,
(uint32_t)(void*)::pins::analogSetPeriod,
(uint32_t)(void*)::pins::onPulsed,
(uint32_t)(void*)::pins::pulseDuration,
(uint32_t)(void*)::pins::pulseIn,
(uint32_t)(void*)::pins::servoWritePin,
(uint32_t)(void*)::pins::servoSetPulse,
(uint32_t)(void*)::pins::analogSetPitchPin,
(uint32_t)(void*)::pins::analogPitch,
(uint32_t)(void*)::pins::setPull,
(uint32_t)(void*)::pins::setEvents,
(uint32_t)(void*)::pins::createBuffer,
(uint32_t)(void*)::pins::i2cReadBuffer,
(uint32_t)(void*)::pins::i2cWriteBuffer,
(uint32_t)(void*)::pins::spiWrite,
(uint32_t)(void*)::pins::spiFrequency,
(uint32_t)(void*)::pins::spiFormat,
(uint32_t)(void*)::pins::spiPins,
(uint32_t)(void*)::serial::readUntil,
(uint32_t)(void*)::serial::readString,
(uint32_t)(void*)::serial::onDataReceived,
(uint32_t)(void*)::serial::writeString,
(uint32_t)(void*)::serial::writeBuffer,
(uint32_t)(void*)::serial::readBuffer,
(uint32_t)(void*)::serial::redirect,
(uint32_t)(void*)::serial::redirectToUSB,
(uint32_t)(void*)::BufferMethods::getByte,
(uint32_t)(void*)::BufferMethods::setByte,
(uint32_t)(void*)::BufferMethods::getBytes,
(uint32_t)(void*)::BufferMethods::setNumber,
(uint32_t)(void*)::BufferMethods::getNumber,
(uint32_t)(void*)::BufferMethods::length,
(uint32_t)(void*)::BufferMethods::fill,
(uint32_t)(void*)::BufferMethods::slice,
(uint32_t)(void*)::BufferMethods::shift,
(uint32_t)(void*)::BufferMethods::rotate,
(uint32_t)(void*)::BufferMethods::write,
(uint32_t)(void*)::radio::sendNumber,
(uint32_t)(void*)::radio::sendValue,
(uint32_t)(void*)::radio::sendString,
(uint32_t)(void*)::radio::writeValueToSerial,
(uint32_t)(void*)::radio::writeReceivedPacketToSerial,
(uint32_t)(void*)::radio::receiveNumber,
(uint32_t)(void*)::radio::onDataReceived,
(uint32_t)(void*)::radio::receiveString,
(uint32_t)(void*)::radio::receivedSignalStrength,
(uint32_t)(void*)::radio::setGroup,
(uint32_t)(void*)::radio::setTransmitPower,
(uint32_t)(void*)::radio::setTransmitSerialNumber,
(uint32_t)(void*)::radio::receivedNumber,
(uint32_t)(void*)::radio::receivedSerial,
(uint32_t)(void*)::radio::receivedString,
(uint32_t)(void*)::radio::receivedTime,

PXT_SHIMS_END
