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

import {
  assert,
  assertEquals,
  assertNotEquals
} from "https://deno.land/std/testing/asserts.ts";

import { Nuid } from "../src/nuid.js";

function rangeEquals(
  ba: Uint8Array,
  bb: Uint8Array,
  start?: number,
  end?: number,
) {
  let equal = true;
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = ba.length;
  }
  for (let i = start; i < end; i++) {
    if (ba[i] !== bb[i]) {
      equal = false;
      break;
    }
  }
  return equal;
}

Deno.test("global nuid should not be null", () => {
  let nuid = new Nuid();
  assert(nuid);
  assert(nuid.buf);
  assert(nuid.buf.byteLength);
  assert(nuid.seq);
  assert(nuid.seq > 0);
  assert(nuid.inc);
});

Deno.test("duplicate nuids", () => {
  let nuid = new Nuid();
  let m = {} as { [key: string]: boolean };
  let count = 100000;
  // make this really big when testing, for normal runs small
  for (let i = 0; i < count; i++) {
    let k = nuid.next();
    assert(!m[k]);
    m[k] = true;
  }
});

Deno.test("roll seq", () => {
  let nuid = new Nuid();

  let a = new Uint8Array(10);
  a.set(nuid.buf.slice(12, 22), 0);
  nuid.next();
  let b = new Uint8Array(10);
  b.set(nuid.buf.slice(12, 22), 0);
  assertNotEquals(a, b);
});

Deno.test("roll pre", () => {
  let nuid = new Nuid();

  nuid.seq = 3656158440062976 + 1;
  let a = new Uint8Array(12);
  a.set(nuid.buf.slice(0, 12), 0);
  assertEquals(a.byteLength, 12);
  nuid.next();
  let b = new Uint8Array(12);
  b.set(nuid.buf.slice(0, 12), 0);
  assertEquals(b.byteLength, 12);
  assert(!rangeEquals(a, b));
});

Deno.test("reset should reset", () => {
  let nuid = new Nuid();
  let a = new Uint8Array(22);
  a.set(nuid.buf.slice(0, 22));
  assertEquals(a.length, 22);
  nuid.reset();
  let b = new Uint8Array(12);
  b.set(nuid.buf.slice(0, 12), 0);
  assertEquals(b.length, 12);

  assert(!rangeEquals(a, b, 0, 12));
  assert(!rangeEquals(a, b, 12));
});

