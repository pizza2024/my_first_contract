import { Address } from "@ton/core";

const addr1 = '0:a3935861f79daf59a13d6d182e1640210c02f98e3df18fda74b8f5ab141abf18';
const a = Address.parseRaw(addr1)
console.log(a)

const addr2 = 'a3935861f79daf59a13d6d182e1640210c02f98e3df18fda74b8f5ab141abf18';
const b = (new Address(0, Buffer.from(addr2, 'hex'))).toString();
console.log(b)

