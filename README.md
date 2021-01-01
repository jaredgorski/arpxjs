**NOTE: This package is deprecated and archived. It will still work up till Node 12 and arpx 0.3.1, however it is now recommended to treat arpx as a system utility (install on server and invoke via commands).**

# arpxjs
![npm](https://img.shields.io/npm/v/arpxjs?color=black)
[![Build Status](https://travis-ci.com/jaredgorski/arpxjs.svg?branch=master)](https://travis-ci.com/jaredgorski/arpxjs)
<br>Automate and relate multiple processes programmatically.

## Description

**arpxjs** enables Node programs to automate, schedule, and parallelize processes relative to each other based on a local YAML profile by exposing a function which binds to the **arpx** utility. See [**arpx**](https://github.com/jaredgorski/arpx) for details about the utility itself.

Invoking the exported `arpxjs()` function, passing a filepath to a valid PROFILE, and specifying an array of PROCESSES to run from the profile will execute the given PROCESSES, according to the PROFILE, in the current runtime.

## Platforms
|                       | Node 8 | Node 10 | Node 12 | Node 14 |
| --------------------- | ------ | ------- | ------- | ------- |
| Linux x64 - glibc     | ✓      | ✓       | ✓       | ✗ :(    |
| Linux x64 - musl-libc | ✓      | ✓       | ✓       | ✗ :(    |
| OSX x64               | ✓      | ✓       | ✓       | ✗ :(    |

_NOTE: Feel free to implement support for your platform and send a PR. Alternatively, open an issue requesting support._

## Installation
```js
$ npm install arpxjs
```

## Usage
**arpx.yaml**
```yaml
processes:
  - name: loop1
    command: |
      for i in {1..5}
      do
        sleep 1
        echo "Loop1 $i"
      done
    blocking: true
  - name: loop3
    command: |
      for i in {1..5}
      do
        sleep 1
        echo "Loop3 $i"
      done

monitors:
  - process: loop1
    condition: '[[ "$LOG_LINE" =~ "Loop1 5" ]]'
    actions:
      - loop2

actions:
  - name: loop2
    command: |
      for i in {1..3}
      do
        sleep 1
        echo "Loop2 $i"
      done
      exit
```

**index.js**
```js
const {arpxjs} = require('arpxjs');

console.log('before');
arpxjs('./arpx.yaml', ['loop1', 'loop3']);
console.log('after');
```

```shell
$ node index.js
```

**Output:**
![Example arpx blocking output](https://github.com/jaredgorski/arpx/raw/master/.media/arpx_blocking_screenshot-annotated.png)

## Acknowledgements
- Much of the CI configuration to distribute a project with Neon bindings to a Rust binary was built based on the method implemented [here](https://github.com/IronCoreLabs/recrypt-node-binding).

