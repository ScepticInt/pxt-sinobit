# Sino:Bit target for PXT 

This is a WORK IN PROGRESS port for Sino:Bit.

There's probably a lot of things that need to be fixed and refactored.

I post this here as WORK IN PROGRESS and anyone who wants to help is *very* welcome to do so.

It's been awhile since i was working on this so there are probably a lot of embarrassing mistakes left in the code.

You have been warned!

## To run this on your computer,
Clone this repo:

$ git clone https://github.com/ScepticInt/pxt-sinobit.git
$ cd pxt-sinobit

Install PXT: 
$ npm install -g pxt

Start pxt
$ pxt serve

pxt should start a browser and load the Sino:Bit workspace.

Feel free to create issues here, if your get errors please attach as much info (error messages etc) as you can.














--- Original readme:
## micro:bit target for PXT

This target allows you to program a [BBC micro:bit](https://microbit.org/) using 
PXT ([Microsoft Programming Experience Toolkit](https://github.com/Microsoft/pxt)).

* [Try it live](https://makecode.microbit.org)

[![Build Status](https://travis-ci.org/Microsoft/pxt-microbit.svg?branch=master)](https://travis-ci.org/Microsoft/pxt-microbit)

## Issue tracking

All issue tracking for this repo happens at https://github.com/Microsoft/pxt, see you there!

## Local server

The local server lets you to run the editor and serve the documentation from your own computer.

### Setup

The following commands perform a one-time setup after synching the repo on your machine.

* See requirements for [pxt](https://github.com/Microsoft/pxt)
* [clone this repo](https://help.github.com/articles/cloning-a-repository/) to your computer and go in the project folder
```
git clone https://github.com/microsoft/pxt-microbit
cd pxt-microbit
```
* install the PXT command line (add ``sudo`` for Mac/Linux shells).
```
npm install -g pxt
```
* install the dependencies
```
npm install

```

### Running

Run this command to open a local web server (add ``sudo`` for Mac/Linux shells)
```
pxt serve
```
If the local server opens in the wrong browser, make sure to copy the URL containing the local token. 
Otherwise, the editor will not be able to load the projects.

If you need modify the `.cpp` files, turn on yotta compilation with the ``-yt`` flag (add ``sudo`` for Mac/Linux shells):
```
pxt serve -yt
```

## Updates

To update your PXT version and make sure you're running the latest tools, run (add ``sudo`` for Mac/Linux shells):
```
pxt update
```

More instructions are at https://github.com/Microsoft/pxt#running-a-target-from-localhost 

## Testing

The build also automatically runs the following checks:

* make sure the built-in packages compile
* `pxt run` in `libs/lang-test*` - this will run the test in command line runner; 
  there is a number of asserts in both of these
* `pxt testdir` in `tests` - this makes sure all the files compile and generates .hex files
* run the TD->TS converter on a number of test scripts from `microbit.co.uk` and make sure the results compile

To test something on the device:

* do a `pxt deploy` in `libs/lang-test*` - they should show `1` or `2` on the screen (and not unhappy face)
* run `pxt testdir` in `tests` and deploy some of the hex files from `tests/built`

The `lang-test0` source comes from the `pxt-core` package. It's also tested with `pxt run` there. 

## Repos 

The pxt-microbit target depends on several other repos. The main ones are:
- https://github.com/Microsoft/pxt, the PXT framework
- https://github.com/lancaster-university/microbit, basic wrapper around the DAL
- https://github.com/lancaster-university/microbit-dal

## Versions

Current serviced versions of pxt-microbit:

| Target | Version | Type | PXT |
|---|---|---|---|
| pxt-microbit  | v0.13.\* | accessibility | uses pxt/v0 v.0.13.\* (with accessibility) |
| pxt-microbit  | v0.12.\* | release | uses pxt/v0 v.0.12.\* |

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
