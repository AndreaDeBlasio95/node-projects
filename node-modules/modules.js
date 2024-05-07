//console.log(arguments);
//console.log(require("module").wrapper);

// module.exports
const C = require("./test-modules-1");
const calc1 = new C();
console.log(calc1.add(3, 5));

// exports (ES6)
//const calc2 = require("./test-module-2");
// we can use destructuring to import only the functions we need
// we should use the exact same names as the exports
const { add, multiply, divide } = require("./test-module-2");
console.log(add(3, 5));

// caching
// when we call multiple times the same module, the console.log is only executed once, but the function is executed multiple times
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
