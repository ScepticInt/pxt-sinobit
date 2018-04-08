#include "pxt.h"

enum class Button {
    A = MICROBIT_ID_BUTTON_A,
    B = MICROBIT_ID_BUTTON_B,
    //% block="A+B"
    AB = MICROBIT_ID_BUTTON_AB,
};

enum class Dimension {
    //% block=x
    X = 0,
    //% block=y
    Y = 1,
    //% block=z
    Z = 2,
    //% block=strength
    Strength = 3,
};

enum class Rotation {
    //% block=pitch
    Pitch = 0,
    //% block=roll
    Roll = 1,
};

enum class TouchPin {
    P0 = MICROBIT_ID_IO_P0,
    P1 = MICROBIT_ID_IO_P1,
    P2 = MICROBIT_ID_IO_P2,
};

enum class AcceleratorRange {
    /**
     * The accelerator measures forces up to 1 gravity
     */
    //%  block="1g"
    OneG = 1,
    /**
     * The accelerator measures forces up to 2 gravity
     */
    //%  block="2g"
    TwoG = 2,
    /**
     * The accelerator measures forces up to 4 gravity
     */
    //% block="4g"
    FourG = 4,
    /**
     * The accelerator measures forces up to 8 gravity
     */
    //% block="8g"
    EightG = 8
};

enum class Gesture {
    /**
     * Raised when shaken
     */
    //% block=shake
    Shake = MICROBIT_ACCELEROMETER_EVT_SHAKE,
    /**
     * Raised when the logo is upward and the screen is vertical
     */
    //% block="logo up"
    LogoUp = MICROBIT_ACCELEROMETER_EVT_TILT_UP,
    /**
     * Raised when the logo is downward and the screen is vertical
     */
    //% block="logo down"
    LogoDown = MICROBIT_ACCELEROMETER_EVT_TILT_DOWN,
    /**
     * Raised when the screen is pointing down and the board is horizontal
     */
    //% block="screen up"
    ScreenUp = MICROBIT_ACCELEROMETER_EVT_FACE_UP,
    /**
     * Raised when the screen is pointing up and the board is horizontal
     */
    //% block="screen down"
    ScreenDown = MICROBIT_ACCELEROMETER_EVT_FACE_DOWN,
    /**
     * Raised when the screen is pointing left
     */
    //% block="tilt left"
    TiltLeft = MICROBIT_ACCELEROMETER_EVT_TILT_LEFT,
    /**
     * Raised when the screen is pointing right
     */
    //% block="tilt right"
    TiltRight = MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT,
    /**
     * Raised when the board is falling!
     */
    //% block="free fall"
    FreeFall = MICROBIT_ACCELEROMETER_EVT_FREEFALL,
    /**
    * Raised when a 3G shock is detected
    */
    //% block="3g"
    ThreeG = MICROBIT_ACCELEROMETER_EVT_3G,
    /**
    * Raised when a 6G shock is detected
    */
    //% block="6g"
    SixG = MICROBIT_ACCELEROMETER_EVT_6G,
    /**
    * Raised when a 8G shock is detected
    */
    //% block="8g"
    EightG = MICROBIT_ACCELEROMETER_EVT_8G
};

enum class MesDpadButtonInfo {
    //% block="A down"
    ADown = MES_DPAD_BUTTON_A_DOWN,
    //% block="A up"
    AUp = MES_DPAD_BUTTON_A_UP,
    //% block="B down"
    BDown = MES_DPAD_BUTTON_B_DOWN,
    //% block="B up"
    BUp = MES_DPAD_BUTTON_B_UP,
    //% block="C down"
    CDown = MES_DPAD_BUTTON_C_DOWN,
    //% block="C up"
    CUp = MES_DPAD_BUTTON_C_UP,
    //% block="D down"
    DDown = MES_DPAD_BUTTON_D_DOWN,
    //% block="D up"
    DUp = MES_DPAD_BUTTON_D_UP,
    //% block="1 down"
    _1Down = MES_DPAD_BUTTON_1_DOWN,
    //% block="1 up"
    _1Up = MES_DPAD_BUTTON_1_UP,
    //% block="2 down"
    _2Down = MES_DPAD_BUTTON_2_DOWN,
    //% block="2 up"
    _2Up = MES_DPAD_BUTTON_2_UP,
    //% block="3 down"
    _3Down = MES_DPAD_BUTTON_3_DOWN,
    //% block="3 up"
    _3Up = MES_DPAD_BUTTON_3_UP,
    //% block="4 down"
    _4Down = MES_DPAD_BUTTON_4_DOWN,
    //% block="4 up"
    _4Up = MES_DPAD_BUTTON_4_UP,
};

//
namespace input {
//
//
//
//
//
//
//
//
    void onButtonPressed(Button button, Action body) {
        registerWithDal((int)button, MICROBIT_BUTTON_EVT_CLICK, body);
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
    void onGesture(Gesture gesture, Action body) {
        int gi = (int)gesture;
        if (gi == MICROBIT_ACCELEROMETER_EVT_3G && uBit.accelerometer.getRange() < 3)
            uBit.accelerometer.setRange(4);
        else if ((gi == MICROBIT_ACCELEROMETER_EVT_6G || gi == MICROBIT_ACCELEROMETER_EVT_8G) && uBit.accelerometer.getRange() < 6)
            uBit.accelerometer.setRange(8);
        registerWithDal(MICROBIT_ID_GESTURE, gi, body);
    }

//
//
//
//
//
//
//
    void onPinPressed(TouchPin name, Action body) {
        auto pin = getPin((int)name);
        if (!pin) return;

        // Forces the PIN to switch to makey-makey style detection.
        pin->isTouched();
        registerWithDal((int)name, MICROBIT_BUTTON_EVT_CLICK, body);
    }

//
//
//
//
//
//
//
//
    void onPinReleased(TouchPin name, Action body) {
        auto pin = getPin((int)name);
        if (!pin) return;

        // Forces the PIN to switch to makey-makey style detection.
        pin->isTouched();
        registerWithDal((int)name, MICROBIT_BUTTON_EVT_UP, body);
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
    bool buttonIsPressed(Button button) {
      if (button == Button::A)
        return uBit.buttonA.isPressed();
      else if (button == Button::B)
        return uBit.buttonB.isPressed();
      else if (button == Button::AB)
        return uBit.buttonAB.isPressed();
      return false;
    }

//
//
//
//
//
//
//
    bool pinIsPressed(TouchPin name) {
        auto pin = getPin((int)name);
        return pin && pin->isTouched();
    }

    int getAccelerationStrength() {
        double x = uBit.accelerometer.getX();
        double y = uBit.accelerometer.getY();
        double z = uBit.accelerometer.getZ();
        return (int)sqrt(x*x+y*y+z*z);
    }

//
//
//
//
//
//
//
    int acceleration(Dimension dimension) {
      switch (dimension) {
      case Dimension::X: return uBit.accelerometer.getX();
      case Dimension::Y: return uBit.accelerometer.getY();
      case Dimension::Z: return uBit.accelerometer.getZ();
      case Dimension::Strength: return getAccelerationStrength();
      }
      return 0;
    }

//
//
//
//
//
//
    int lightLevel() {
        return uBit.display.readLightLevel();
    }

//
//
//
//
//
//
//
    int compassHeading() {
        return uBit.compass.heading();
    }


//
//
//
//
//
//
//
    int temperature() {
        return uBit.thermometer.getTemperature();
    }

//
//
//
//
//
//
//
    int rotation(Rotation kind) {
      switch (kind) {
      case Rotation::Pitch: return uBit.accelerometer.getPitch();
      case Rotation::Roll: return uBit.accelerometer.getRoll();
      }
      return 0;
    }

//
//
//
//
//
//
//
//
    int magneticForce(Dimension dimension) {
      if (!uBit.compass.isCalibrated())
        uBit.compass.calibrate();

      switch (dimension) {
      case Dimension::X: return uBit.compass.getX() / 1000;
      case Dimension::Y: return uBit.compass.getY() / 1000;
      case Dimension::Z: return uBit.compass.getZ() / 1000;
      case Dimension::Strength: return uBit.compass.getFieldStrength() / 1000;
      }
      return 0;
    }

//
//
//
//
//
//
    int runningTime() {
        return system_timer_current_time();
    }

//
//
//
//
//
//
    int runningTimeMicros() {
        return system_timer_current_time_us();
    }

//
//
//
//
//
    void calibrateCompass() { 
        uBit.compass.calibrate();        
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
    void setAccelerometerRange(AcceleratorRange range) {
        uBit.accelerometer.setRange((int)range);
    }
}

