
#include "pxt.h"
#ifdef PXT_MAIN
PXT_MAIN
#else
int main() {
    uBit.init();
    pxt::start();
    while (1) uBit.sleep(10000);
    return 0;
}
#endif
