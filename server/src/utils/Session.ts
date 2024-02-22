import * as crypto from "crypto";

export function GenerateSession() {
    const session = crypto.randomBytes(16).toString("base64");
    return session;
}
