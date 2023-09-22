import * as crypto from 'crypto';

const HASH_SECRET = "mySuperPuperSecretHash";

export function hasher(data: string):string{    
    const sha256Hasher = crypto.createHmac("sha256", HASH_SECRET);
    return sha256Hasher.update(data).digest("hex");;
}

export function hasherCompare(data:string, hash:string):boolean{
    const dataHash = hasher(data);
    return dataHash === hash;
}


// import * as bcrypt from 'bcrypt';

// import * as crypto from 'crypto';

// // const hasss =  crypto.createHash("h")//.from("dimka1997");
// // const hash = crypto.createHash('sha256');

// const str = "I need to be hashed 😃!";
// // secret or salt to be hashed with
// const secret = "This is a company secret 🤫";
// // create a sha-256 hasher
// const sha256Hasher = crypto.createHmac("sha256", secret);

// // console.log(sha256Hasher.update(str).digest("hex"))
// console.log(sha256Hasher.update(str).digest().toString("hex"));

// const buf1 = Buffer.from('1234');
// const buf2 = Buffer.from('1234');
// const arr = [buf1, buf2];
// console.log("compare: ",Buffer.compare(buf1,buf2));

// const HASH_SECRET_SALT = "mySuperPuperSecretHash";

// export async function hasher(data: string):Promise<string>{
//     console.log(`hasher data(${data})`)
//     const hashres  = await bcrypt.hash(data,10);
//     return hashres;
// }