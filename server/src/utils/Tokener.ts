export function CreateToken(): string {
    const max = 20;
    let str = "";
    for (let i = 0; i < max; i++) {
        str += (Math.random() * 9).toFixed(0);
    }
    return str;
}
