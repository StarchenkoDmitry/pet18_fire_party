import { comparePassword, hashPassword } from "./Password";


describe("Password hashing",()=>{
    it("Hashing Test 1",async ()=>{
        const plainText = "BOB";
        const hash = await hashPassword(plainText)
        const compared = await comparePassword(plainText,hash);
        expect(compared).toBe(true);
    });
});
