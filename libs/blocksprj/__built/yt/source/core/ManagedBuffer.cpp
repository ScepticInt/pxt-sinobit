#include "MicroBit.h"
#include "ManagedBuffer.h"
#include <limits.h>

static const char empty[] __attribute__ ((aligned (4))) = "\xff\xff\0\0\0";

//
//
//
//
void ManagedBuffer::initEmpty()
{
    ptr = (BufferData*)(void*)empty;
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
ManagedBuffer::ManagedBuffer()
{
    initEmpty();
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
ManagedBuffer::ManagedBuffer(int length)
{
    this->init(NULL, length);
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
ManagedBuffer::ManagedBuffer(uint8_t *data, int length)
{
    this->init(data, length);
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
ManagedBuffer::ManagedBuffer(const ManagedBuffer &buffer)
{
    ptr = buffer.ptr;
    ptr->incr();
}

//
//
//
//
//
//
ManagedBuffer::ManagedBuffer(BufferData *p)
{
    ptr = p;
    ptr->incr();
}

//
//
//
//
//
//
//
void ManagedBuffer::init(uint8_t *data, int length)
{
    if (length <= 0) {
        initEmpty();
        return;
    }

    ptr = (BufferData *) malloc(sizeof(BufferData) + length);
    ptr->init();

    ptr->length = length;

    // Copy in the data buffer, if provided.
    if (data)
        memcpy(ptr->payload, data, length);
    else
        memset(ptr->payload, 0, length);
}

//
//
//
//
ManagedBuffer::~ManagedBuffer()
{
    ptr->decr();
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
ManagedBuffer& ManagedBuffer::operator = (const ManagedBuffer &p)
{
    if(ptr == p.ptr)
        return *this;

    ptr->decr();
    ptr = p.ptr;
    ptr->incr();

    return *this;
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
bool ManagedBuffer::operator== (const ManagedBuffer& p)
{
    if (ptr == p.ptr)
        return true;
    else
        return (ptr->length == p.ptr->length && (memcmp(ptr->payload, p.ptr->payload, ptr->length)==0));    
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
int ManagedBuffer::setByte(int position, uint8_t value)
{
    if (0 <= position && position < ptr->length)
    {
        ptr->payload[position] = value;
        return MICROBIT_OK;
    }
    else
    {
        return MICROBIT_INVALID_PARAMETER;
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
//
//
int ManagedBuffer::getByte(int position)
{
    if (0 <= position && position < ptr->length)
        return ptr->payload[position];
    else
        return MICROBIT_INVALID_PARAMETER;
} 

//
//
//
//
BufferData *ManagedBuffer::leakData()
{
    BufferData* res = ptr;
    initEmpty();
    return res;
}


int ManagedBuffer::fill(uint8_t value, int offset, int length)
{
    if (offset < 0 || offset > ptr->length)
        return MICROBIT_INVALID_PARAMETER;
    if (length < 0)
        length = ptr->length;
    length = min(length, ptr->length - offset);

    memset(ptr->payload + offset, value, length);

    return MICROBIT_OK;
}

ManagedBuffer ManagedBuffer::slice(int offset, int length) const
{
    offset = min(ptr->length, offset);
    if (length < 0)
        length = ptr->length;
    length = min(length, ptr->length - offset);
    return ManagedBuffer(ptr->payload + offset, length);
}

void ManagedBuffer::shift(int offset, int start, int len)
{
    if (len < 0) len = ptr->length - start;    
    if (start < 0 || start + len > ptr->length || start + len < start
        || len == 0 || offset == 0 || offset == INT_MIN) return;
    if (offset <= -len || offset >= len) {
        fill(0);
        return;
    }
        
    uint8_t *data = ptr->payload + start;
    if (offset < 0) {
        offset = -offset;
        memmove(data + offset, data, len - offset);
        memset(data, 0, offset);
    } else {
        len = len - offset;
        memmove(data, data + offset, len);
        memset(data + len, 0, offset);
    }
}

void ManagedBuffer::rotate(int offset, int start, int len)
{
    if (len < 0) len = ptr->length - start;
    if (start < 0 || start + len > ptr-> length || start + len < start
        || len == 0 || offset == 0 || offset == INT_MIN) return;

    if (offset < 0)
        offset += len << 8; // try to make it positive
    offset %= len;
    if (offset < 0)
        offset += len;

    uint8_t *data = ptr->payload + start;

    uint8_t *n_first = data + offset;
    uint8_t *first = data;
    uint8_t *next = n_first;
    uint8_t *last = data + len;

    while (first != next) {
        uint8_t tmp = *first;
        *first++ = *next;
        *next++ = tmp;
        if (next == last) {
            next = n_first;
        } else if (first == n_first) {
            n_first = next;
        }
    }
}

int ManagedBuffer::writeBuffer(int dstOffset, const ManagedBuffer &src, int srcOffset, int length)
{
    if (length < 0)
        length = src.length();

    if (srcOffset < 0 || dstOffset < 0 || dstOffset > ptr->length)
        return MICROBIT_INVALID_PARAMETER;

    length = min(src.length() - srcOffset, ptr->length - dstOffset);

    if (length < 0)
        return MICROBIT_INVALID_PARAMETER;

    if (ptr == src.ptr) {
        memmove(getBytes() + dstOffset, src.ptr->payload + srcOffset, length);
    } else {
        memcpy(getBytes() + dstOffset, src.ptr->payload + srcOffset, length);
    }

    return MICROBIT_OK;
}

int ManagedBuffer::writeBytes(int offset, uint8_t *src, int length, bool swapBytes)
{
    if (offset < 0 || length < 0 || offset + length > ptr->length)
        return MICROBIT_INVALID_PARAMETER;

    if (swapBytes) {
        uint8_t *p = ptr->payload + offset + length;
        for (int i = 0; i < length; ++i)
            *--p = src[i];
    } else {
        memcpy(ptr->payload + offset, src, length);
    }

    return MICROBIT_OK;
}

int ManagedBuffer::readBytes(uint8_t *dst, int offset, int length, bool swapBytes) const
{
    if (offset < 0 || length < 0 || offset + length > ptr->length)
        return MICROBIT_INVALID_PARAMETER;

    if (swapBytes) {
        uint8_t *p = ptr->payload + offset + length;
        for (int i = 0; i < length; ++i)
            dst[i] = *--p;
    } else {
        memcpy(dst, ptr->payload + offset, length);
    }

    return MICROBIT_OK;
}

