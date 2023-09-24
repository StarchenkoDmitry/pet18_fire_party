const emailFormat = "<emailPrefix>@<emailDomain>";
const emailPrefixes = ["test", "user", "random", "example"];
const emailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

export function RandomEmail():string{
    const email = Math.random().toString(36).substring(2, 15) + '@gmail.com';
    return email;
}