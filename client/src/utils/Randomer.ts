const emailFormat = "<emailPrefix>@<emailDomain>";
const emailPrefixes = ["test", "user", "random", "example"];
const emailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

export function RandomEmail():string{
    const email = Math.random().toString(36).substring(2, 15) + '@gmail.com';
    return email;
}


export function RandomLogin() {
    const login = Math.random().toString(36).substring(2, 10);
    return login;
}


export function RandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 8;
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}

export function RandomName() {
    const names = ['Alice', 'Bob', 'Charlie', 'Daisy', 'Ethan', 'Fiona', 'George', 'Hannah', 'Димочка', 'ЖеняУтка', 'Буба', 'Фанариков', 'Шариков'];
    const randomIndex = Math.floor(Math.random() * names.length);
    const name = names[randomIndex];
    return name;
}