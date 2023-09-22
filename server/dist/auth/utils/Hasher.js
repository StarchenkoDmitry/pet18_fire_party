"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasherCompare = exports.hasher = void 0;
const crypto = require("crypto");
const HASH_SECRET = "mySuperPuperSecretHash";
function hasher(data) {
    const sha256Hasher = crypto.createHmac("sha256", HASH_SECRET);
    return sha256Hasher.update(data).digest("hex");
    ;
}
exports.hasher = hasher;
function hasherCompare(data, hash) {
    const dataHash = hasher(data);
    return dataHash === hash;
}
exports.hasherCompare = hasherCompare;
//# sourceMappingURL=Hasher.js.map