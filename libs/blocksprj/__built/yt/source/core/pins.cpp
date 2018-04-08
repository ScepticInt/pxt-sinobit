#include "pxt.h"

enum class DigitalPin {
    P0 = MICROBIT_ID_IO_P0,
    P1 = MICROBIT_ID_IO_P1,
    P2 = MICROBIT_ID_IO_P2,
    P3 = MICROBIT_ID_IO_P3,
    P4 = MICROBIT_ID_IO_P4,
    P5 = MICROBIT_ID_IO_P5,
    P6 = MICROBIT_ID_IO_P6,
    P7 = MICROBIT_ID_IO_P7,
    P8 = MICROBIT_ID_IO_P8,
    P9 = MICROBIT_ID_IO_P9,
    P10 = MICROBIT_ID_IO_P10,
    P11 = MICROBIT_ID_IO_P11,
    P12 = MICROBIT_ID_IO_P12,
    P13 = MICROBIT_ID_IO_P13,
    P14 = MICROBIT_ID_IO_P14,
    P15 = MICROBIT_ID_IO_P15,
    P16 = MICROBIT_ID_IO_P16,
    P19 = MICROBIT_ID_IO_P19,
    P20 = MICROBIT_ID_IO_P20,
};

enum class AnalogPin {
    P0 = MICROBIT_ID_IO_P0,
    P1 = MICROBIT_ID_IO_P1,
    P2 = MICROBIT_ID_IO_P2,
    P3 = MICROBIT_ID_IO_P3,
    P4 = MICROBIT_ID_IO_P4,
    P10 = MICROBIT_ID_IO_P10,
    //% block="P5 (write only)"
    P5 = MICROBIT_ID_IO_P5,
    //% block="P6 (write only)"
    P6 = MICROBIT_ID_IO_P6,
    //% block="P7 (write only)"
    P7 = MICROBIT_ID_IO_P7,
    //% block="P8 (write only)"
    P8 = MICROBIT_ID_IO_P8,
    //% block="P9 (write only)"
    P9 = MICROBIT_ID_IO_P9,
    //% block="P11 (write only)"
    P11 = MICROBIT_ID_IO_P11,
    //% block="P12 (write only)"
    P12 = MICROBIT_ID_IO_P12,
    //% block="P13 (write only)"
    P13 = MICROBIT_ID_IO_P13,
    //% block="P14 (write only)"
    P14 = MICROBIT_ID_IO_P14,
    //% block="P15 (write only)"
    P15 = MICROBIT_ID_IO_P15,
    //% block="P16 (write only)"
    P16 = MICROBIT_ID_IO_P16,
    //% block="P19 (write only)"
    P19 = MICROBIT_ID_IO_P19,
    //% block="P20 (write only)"
    P20 = MICROBIT_ID_IO_P20
};

enum class PulseValue {
    //% block=high
    High = MICROBIT_PIN_EVT_PULSE_HI,
    //% block=low
    Low = MICROBIT_PIN_EVT_PULSE_LO
};

enum class PinPullMode {
    //% block="down"
    PullDown = 0,
    //% block="up"
    PullUp = 1,
    //% block="none"
    PullNone = 2
};

enum class PinEventType {
    //% block="edge"
    Edge = MICROBIT_PIN_EVENT_ON_EDGE,
    //% block="pulse"
    Pulse = MICROBIT_PIN_EVENT_ON_PULSE,
    //% block="touch"
    Touch = MICROBIT_PIN_EVENT_ON_TOUCH,
    //% block="none"
    None = MICROBIT_PIN_EVENT_NONE
};

MicroBitPin *getPin(int id) {
    switch (id) {
        case MICROBIT_ID_IO_P0: return &uBit.io.P0;
        case MICROBIT_ID_IO_P1: return &uBit.io.P1;
        case MICROBIT_ID_IO_P2: return &uBit.io.P2;
        case MICROBIT_ID_IO_P3: return &uBit.io.P3;
        case MICROBIT_ID_IO_P4: return &uBit.io.P4;
        case MICROBIT_ID_IO_P5: return &uBit.io.P5;
        case MICROBIT_ID_IO_P6: return &uBit.io.P6;
        case MICROBIT_ID_IO_P7: return &uBit.io.P7;
        case MICROBIT_ID_IO_P8: return &uBit.io.P8;
        case MICROBIT_ID_IO_P9: return &uBit.io.P9;
        case MICROBIT_ID_IO_P10: return &uBit.io.P10;
        case MICROBIT_ID_IO_P11: return &uBit.io.P11;
        case MICROBIT_ID_IO_P12: return &uBit.io.P12;
        case MICROBIT_ID_IO_P13: return &uBit.io.P13;
        case MICROBIT_ID_IO_P14: return &uBit.io.P14;
        case MICROBIT_ID_IO_P15: return &uBit.io.P15;
        case MICROBIT_ID_IO_P16: return &uBit.io.P16;
        case MICROBIT_ID_IO_P19: return &uBit.io.P19;
        case MICROBIT_ID_IO_P20: return &uBit.io.P20;
        default: return NULL;
    }
}


namespace pins {
    #define PINOP(op) \
      MicroBitPin *pin = getPin((int)name); \
      if (!pin) return; \
      pin->op

    #define PINREAD(op) \
      MicroBitPin *pin = getPin((int)name); \
      if (!pin) return 0; \
      return pin->op


//
    MicroBitPin *getPinAddress(int id) {
        return getPin(id);
    }

//
//
//
//
//
//
//
//
    int digitalReadPin(DigitalPin name) {
        PINREAD(getDigitalValue());
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
    void digitalWritePin(DigitalPin name, int value) {
        PINOP(setDigitalValue(value));
    }

//
//
//
//
//
//
//
//
    int analogReadPin(AnalogPin name) {
        PINREAD(getAnalogValue());
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
    void analogWritePin(AnalogPin name, int value) {
        PINOP(setAnalogValue(value));
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
    void analogSetPeriod(AnalogPin name, int micros) {
        PINOP(setAnalogPeriodUs(micros));
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
    void onPulsed(DigitalPin name, PulseValue pulse, Action body) {
        MicroBitPin* pin = getPin((int)name);
        if (!pin) return;

        pin->eventOn(MICROBIT_PIN_EVENT_ON_PULSE);
        registerWithDal((int)name, (int)pulse, body);
    }

//
//
//
//
//
//
    int pulseDuration() {
        return pxt::lastEvent.timestamp;
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
    int pulseIn(DigitalPin name, PulseValue value, int maxDuration = 2000000) {
        MicroBitPin* pin = getPin((int)name);
        if (!pin) return 0;

        int pulse = value == PulseValue::High ? 1 : 0;
        uint64_t tick =  system_timer_current_time_us();
        uint64_t maxd = (uint64_t)maxDuration;
        while(pin->getDigitalValue() != pulse) {
            if(system_timer_current_time_us() - tick > maxd)
                return 0;
        }

        uint64_t start =  system_timer_current_time_us();
        while(pin->getDigitalValue() == pulse) {
            if(system_timer_current_time_us() - tick > maxd)
                return 0;
        }
        uint64_t end =  system_timer_current_time_us();
        return end - start;
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
    void servoWritePin(AnalogPin name, int value) {
        PINOP(setServoValue(value));
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
    void servoSetPulse(AnalogPin name, int micros) {
        PINOP(setServoPulseUs(micros));
    }


    MicroBitPin* pitchPin = NULL;

//
//
//
//
//
//
//
//
    void analogSetPitchPin(AnalogPin name) {
      pitchPin = getPin((int)name);
    }

//
//
//
//
//
//
//
    void analogPitch(int frequency, int ms) {
      if (pitchPin == NULL)
        analogSetPitchPin(AnalogPin::P0);
      if (frequency <= 0) {
        pitchPin->setAnalogValue(0);
      } else {
        pitchPin->setAnalogValue(512);
        pitchPin->setAnalogPeriodUs(1000000/frequency);
      }

      if (ms > 0) {
          fiber_sleep(ms);
          pitchPin->setAnalogValue(0);
          // TODO why do we use wait_ms() here? it's a busy wait I think
          wait_ms(5);
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
    void setPull(DigitalPin name, PinPullMode pull) {
        PinMode m = pull == PinPullMode::PullDown
            ? PinMode::PullDown
            : pull == PinPullMode::PullUp ? PinMode::PullUp
            : PinMode::PullNone;
        PINOP(setPull(m));
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
    void setEvents(DigitalPin name, PinEventType type) {
        getPin((int)name)->eventOn((int)type);
    }

//
//
//
//
//
    Buffer createBuffer(int size)
    {
        return ManagedBuffer(size).leakData();
    }

//
//
//
//
    Buffer i2cReadBuffer(int address, int size, bool repeat = false)
    {
      Buffer buf = createBuffer(size);
      uBit.i2c.read(address << 1, (char*)buf->payload, size, repeat);
      return buf;
    }

//
//
//
//
    void i2cWriteBuffer(int address, Buffer buf, bool repeat = false)
    {
      uBit.i2c.write(address << 1, (char*)buf->payload, buf->length, repeat);
    }

    SPI* spi = NULL;
    SPI* allocSPI() {
        if (NULL == spi)
            spi = new SPI(MOSI, MISO, SCK);
        return spi;
    }

//
//
//
//
//
//
    int spiWrite(int value) {
        auto p = allocSPI();
        return p->write(value);
    }

//
//
//
//
//
//
    void spiFrequency(int frequency) {
        auto p = allocSPI();
        p->frequency(frequency);
    }

//
//
//
//
//
//
//
    void spiFormat(int bits, int mode) {
        auto p = allocSPI();
        p->format(bits, mode);        
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
//
    void spiPins(DigitalPin mosi, DigitalPin miso, DigitalPin sck) {
        if (NULL != spi) {
            delete spi;
            spi = NULL;
        }

        spi = new SPI(getPin((int)mosi)->name, getPin((int)miso)->name, getPin((int)sck)->name);
    }
}

