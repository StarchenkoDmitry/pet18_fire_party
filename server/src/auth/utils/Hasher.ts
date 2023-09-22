import bcrypt from 'bcrypt'


const HASH_SECRET_SALT = "mySuperPuperSecretHash";

export async function hasher(data: string):Promise<string>{
    const hashres  = await bcrypt.hash(data,HASH_SECRET_SALT);
    return hashres;
}