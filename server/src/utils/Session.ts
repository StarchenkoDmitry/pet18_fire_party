import * as crypto from "crypto";
import { SESSION_LENGTH } from "src/common/constants";

export function GenerateRandomSession() {
    const session = crypto.randomBytes(SESSION_LENGTH).toString("hex");
    return session;
}
