#include "pxt.h"

#define MICROBIT_SERIAL_READ_BUFFER_LENGTH 64

enum SerialPin {
    P0 = MICROBIT_ID_IO_P0,
    P1 = MICROBIT_ID_IO_P1,
    P2 = MICROBIT_ID_IO_P2,
    P8 = MICROBIT_ID_IO_P8,
    P12 = MICROBIT_ID_IO_P12,
    P13 = MICROBIT_ID_IO_P13,
    P14 = MICROBIT_ID_IO_P14,
    P15 = MICROBIT_ID_IO_P15,
    P16 = MICROBIT_ID_IO_P16
};

enum BaudRate {
  //% block=115200
  BaudRate115200 = 115200,
  //% block=57600
  BaudRate57600 = 57600,
  //% block=38400
  BaudRate38400 = 38400,
  //% block=31250
  BaudRate31250 = 31250,
  //% block=28800
  BaudRate28800 = 28800,
  //% block=19200
  BaudRate19200 = 19200,
  //% block=14400
  BaudRate14400 = 14400,
  //% block=9600
  BaudRate9600 = 9600,
  //% block=4800
  BaudRate4800 = 4800,
  //% block=2400
  BaudRate2400 = 2400,
  //% block=1200
  BaudRate1200 = 1200,
  //% block=300
  BaudRate300 = 300
};

enum Delimiters {
    //% block="new line"
    NewLine = 1,
    //% block=","
    Comma = 2,
    //% block="$"
    Dollar = 3,
    //% block=":"
    Colon = 4,
    //% block="."
    Fullstop = 5,
    //% block="#"
    Hash = 6,
};

//
//
namespace serial {
    // note that at least one // followed by % is needed per declaration!

//
//
//
//
//
//
//
    StringData* readUntil(StringData* delimiter) {
      return uBit.serial.readUntil(ManagedString(delimiter)).leakData();
    }

//
//
//
//
//
    StringData* readString() {
      int n = uBit.serial.getRxBufferSize();
      if (n == 0) return ManagedString("").leakData();
      return ManagedString(uBit.serial.read(n, MicroBitSerialMode::ASYNC)).leakData();
    }

//
//
//
//
//
//
    void onDataReceived(StringData* delimiters, Action body) {
      uBit.serial.eventOn(ManagedString(delimiters));
      registerWithDal(MICROBIT_ID_SERIAL, MICROBIT_SERIAL_EVT_DELIM_MATCH, body);
      // lazy initialization of serial buffers
      uBit.serial.read(MicroBitSerialMode::ASYNC);
    }

//
//
//
//
//
//
    void writeString(StringData *text) {
      if (!text) return;

      uBit.serial.send(ManagedString(text));
    }

//
//
//
//
//
    void writeBuffer(Buffer buffer) {
      if (!buffer) return;

      ManagedBuffer buf(buffer);
      uBit.serial.send(buf.getBytes(), buf.length());
    }

//
//
//
//
//
//
    Buffer readBuffer(int length) {
      if (length <= 0)
        length = MICROBIT_SERIAL_READ_BUFFER_LENGTH;
        
      ManagedBuffer buf(length);
      int read = uBit.serial.read(buf.getBytes(), buf.length());
      if (read != buf.length())
        buf = buf.slice(read);

      return buf.leakData();
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
//
//
//
    void redirect(SerialPin tx, SerialPin rx, BaudRate rate) {
      MicroBitPin* txp = getPin(tx); if (!tx) return;
      MicroBitPin* rxp = getPin(rx); if (!rx) return;

      uBit.serial.redirect(txp->name, rxp->name);
      uBit.serial.baud((int)rate);
    }

//
//
//
//
//
    void redirectToUSB() {
      uBit.serial.redirect(USBTX, USBRX);
      uBit.serial.baud(115200);
    }
}

