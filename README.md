# JS NUID

[![license](https://img.shields.io/github/license/nats-io/js-nuid.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Travis branch](https://img.shields.io/travis/nats-io/js-nuid/master.svg)]()
[![Coveralls github branch](https://img.shields.io/coveralls/github/nats-io/js-nuid/master.svg)]()
[![npm](https://img.shields.io/npm/v/js-nuid.svg)](https://www.npmjs.com/package/js-nuid)
[![npm](https://img.shields.io/npm/dt/js-nuid.svg)](https://www.npmjs.com/package/js-nuid)

A highly performant unique identifier generator.

## Installation

Use the `npm` command:

	$ npm install js-nuid

## Basic Usage
```html
<script src="../index.js"></script>

<script>
    n = new nuid.Nuid();
    for (let i = 0; i < 10; i++) {
        let pre = document.createElement("pre");
        let t = document.createTextNode(n.next());
        pre.appendChild(t);
        document.body.appendChild(pre);
    }
</script>
```


## Performance
NUID needs to be very fast to generate and be truly unique, all while being entropy pool friendly.
NUID uses 12 bytes of crypto generated data (entropy draining), and 10 bytes of pseudo-random
sequential data that increments with a pseudo-random increment.

Total length of a NUID string is 22 bytes of base 36 ascii text, so 36^22 or
17324272922341479351919144385642496 possibilities.

## Supported Browsers 

The library uses `crypto` to generate random numbers. Current support for crypto 
can be found here: [https://caniuse.com/#search=crypto](https://caniuse.com/#search=crypto).

If you want to target other browsers, you can shim an implementation of `crypto.getRandomValues()`
such as the one below. However your performance and entropy will vary.

```javascript
window.crypto.getRandomValues = function(array) {
    for(let i=0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * (255));
    }
};
```

## Supported Node Versions

Our support policy for Nodejs versions follows [Nodejs release support]( https://github.com/nodejs/Release).
We will support and build node-nats on even-numbered Nodejs versions that are current or in LTS.

## License

Unless otherwise noted, the NATS source files are distributed under the Apache Version 2.0 license found in the LICENSE file.

