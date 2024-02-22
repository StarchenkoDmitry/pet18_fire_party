import * as crypto from "crypto";

const HASH_SECRET = "mySuperPuperSecretHash";

export function hasher(data: string): string {
    const sha256Hasher = crypto.createHmac("sha256", HASH_SECRET);
    return sha256Hasher.update(data).digest("hex");
}

export function hasherCompare(data: string, hash: string): boolean {
    const dataHash = hasher(data);
    return dataHash === hash;
}
