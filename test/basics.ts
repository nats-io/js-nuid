/*
 * Copyright 2016-2018 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import test from "ava";
import {Nuid, VERSION} from '../src/nuid';


function rangeEquals(ba: Uint8Array, bb: Uint8Array, start?: number, end?: number) {
  let equal = true;
  if(start === undefined) {
    start = 0;
  }
  if(end === undefined) {
    end = ba.length;
  }
  for(let i=start; i < end; i++) {
    if(ba[i] !== bb[i]) {
      equal = false;
      break;
    }
  }
  return equal;
}


test('global nuid should not be null', t => {
    t.plan(6);
    let nuid = new Nuid();
    t.truthy(nuid);
    t.truthy(nuid.buf);
    t.truthy(nuid.buf.byteLength);
    t.truthy(nuid.seq);
    t.truthy(nuid.seq > 0);
    t.truthy(nuid.inc);
});

test('duplicate nuids', t => {
    let nuid = new Nuid();
    let m = {} as {[key: string]: boolean};
    let count = 100000;
    t.plan(count);
    // make this really big when testing, for normal runs small
    for(let i=0; i < count; i++) {
        let k = nuid.next();
        t.falsy(m[k]);
        m[k] = true;
    }
});

test('roll seq', t => {
    let nuid = new Nuid();
    t.plan(1);
    let a = new Uint8Array(10);
    a.set(nuid.buf.slice(12, 22), 0);
    nuid.next();
    let b = new Uint8Array(10);
    b.set(nuid.buf.slice(12, 22), 0);
    t.notDeepEqual(a, b);
});


test('roll pre', t => {
    let nuid = new Nuid();
    t.plan(3);
    nuid.seq = 3656158440062976 + 1;
    let a = new Uint8Array(12);
    a.set(nuid.buf.slice(0,12), 0);
    t.is(a.byteLength, 12);
    nuid.next();
    let b = new Uint8Array(12);
    b.set(nuid.buf.slice(0,12), 0);
    t.is(b.byteLength, 12);
    t.false(rangeEquals(a,b));
});

test('reset should reset', t => {
    let nuid = new Nuid();
    let a = new Uint8Array(22);
    a.set(nuid.buf.slice(0, 22));
    t.is(a.length, 22);
    nuid.reset();
    let b = new Uint8Array(12);
    b.set(nuid.buf.slice(0, 12),0);
    t.is(b.length, 12);

    t.false(rangeEquals(a,b,0,12));
    t.false(rangeEquals(a,b,12));
});


test('package version', t => {
    const v = require('../../package.json').version;
    t.is(v, VERSION);
});

