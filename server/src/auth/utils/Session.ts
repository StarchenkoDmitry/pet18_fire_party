import crypto from "crypto"

export function GenerateSession() {
    const sessionId = crypto.randomBytes(16).toString('base64');
    return sessionId;
}
