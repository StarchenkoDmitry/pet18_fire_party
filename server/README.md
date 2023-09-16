### process inital packege


nodemon

typescript
ts-node
*tslib 
rimraf



npm i -D @types/node

initill 
    rimraf
    nodemon
    tsc

jsonwebtoken
cookie-parser
cors
dotenv
express

ts-node
typescript



"dev": "npx nodemon src/main.ts",


    "nbuild": "tsc",
    "build": "rimraf ./build && npx tsc",
    "start-build": "npm run build && node build/main",
    "start": "node build/main",
    "debagerer": "node --inspect build/main",
    "clear": "rimraf ./build",
    "test2": "tsc -w"