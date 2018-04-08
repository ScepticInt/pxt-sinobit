#ifndef MICROBIT_MANAGED_BUFFER_H
#define MICROBIT_MANAGED_BUFFER_H

#include "mbed.h"
#include "RefCounted.h"

struct BufferData : RefCounted
{
    uint16_t        length;             // The length of the payload in bytes
    uint8_t         payload[0];         // ManagedBuffer data
};

//
//
//
//
//
class ManagedBuffer
{
    BufferData      *ptr;     // Pointer to payload data
    
    public:

//
//
//
//
//
//
//
//
//
    ManagedBuffer();

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
    ManagedBuffer(int length);

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
    ManagedBuffer(uint8_t *data, int length);

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
    ManagedBuffer(const ManagedBuffer &buffer);

//
//
//
//
//
//
    ManagedBuffer(BufferData *p);

//
//
//
//
    void initEmpty();

//
//
//
//
//
//
//
    void init(uint8_t *data, int length);

//
//
//
//
    ~ManagedBuffer();

//
//
//
//
    uint8_t *getBytes()
    {
        return ptr->payload;
    }

//
//
//
//
    BufferData *leakData();

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
//
//
//
//
    ManagedBuffer& operator = (const ManagedBuffer& p);

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
    uint8_t operator [] (int i) const
    {
        return ptr->payload[i];
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
    uint8_t& operator [] (int i)
    {
        return ptr->payload[i];
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
//
//
//
//
    bool operator== (const ManagedBuffer& p);
    
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
    int setByte(int position, uint8_t value);

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
    int getByte(int position);

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
    int length() const { return ptr->length; }

    int fill(uint8_t value, int offset = 0, int length = -1);

    ManagedBuffer slice(int offset = 0, int length = -1) const;

    void shift(int offset, int start = 0, int length = -1);

    void rotate(int offset, int start = 0, int length = -1);

    int readBytes(uint8_t *dst, int offset, int length, bool swapBytes = false) const;

    int writeBytes(int dstOffset, uint8_t *src, int length, bool swapBytes = false);

    int writeBuffer(int dstOffset, const ManagedBuffer &src, int srcOffset = 0, int length = -1);

    bool isReadOnly() const { return ptr->isReadOnly(); }
};

#endif


