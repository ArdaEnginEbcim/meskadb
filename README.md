[![VERSION](https://img.shields.io/npm/v/meskadb?color=%23CC3534&label=Version&logo=npm)](https://www.npmjs.org/package/meskadb) 
[![DOWNLOAD](https://img.shields.io/npm/dt/meskadb?color=%23CC3534&label=Dowload&logo=npm)](https://www.npmjs.org/package/meskadb) 
[![LICENSE](https://img.shields.io/npm/l/meskadb?color=%23CC3534&label=License&logo=npm)](https://www.npmjs.org/package/meskadb)  
[![DISCORD](https://img.shields.io/discord/617925960016068611?color=%237289d9&label=Meska&logo=discord&logoColor=white)](https://discord.gg/RsYDySK2pq)  
#
# meskadb
# How To Install?
```bash
npm install meskadb
```
-
```bash
yarn add meskadb
```
# How To Use?
## NodeJs
```javascript
const meskaDB = require('v30db');
const db = new meskaDB({
  name?: 'database', // default db
  language?: 'en_US', // default en-US
  adapter?: 'JsonDB', // default JsonDB
  seperator?: '.' // default .
});
 
db.set('meska.db.test', 'testing'); // {"meska": {"db": {"test": "testing"} } }
db.set('number', 31); // {"number": 31}
db.get('meska.db'); // {"test": "testing"}
db.fetch('meska.db'); // {"test": "testing"}
db.delete('meska.db.test'); // true
db.has('meska'); // true
db.update('number', (x) => x + 38) // {"number": 69 }
db.add('number', 30); // 99
db.substract('number', 19); // 80
db.substr('number', 10); // 70
db.all(); // {"meska": {"db": {"test": "testing"} }, "number": 70}
db.deleteAll(); // true
```
