import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(plaintextPassword: string): Promise<string> {
    return await bcrypt.hash(plaintextPassword, SALT_ROUNDS);
}

export async function comparePassword(plaintextPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plaintextPassword, hash);
}
