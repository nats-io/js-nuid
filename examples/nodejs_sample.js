// the library works with nodejs but if targeting node use `nuid`
import { Nuid } from "../index.js";

const n = new Nuid();

const start = Date.now();
for (let i = 0; i < 1000000; i++) {
  n.next();
}
console.log(`Generated 1,000,000 nuids in ${Date.now() - start}ms.`);

for (let i = 0; i < 10; i++) {
  console.log(n.next());
}
