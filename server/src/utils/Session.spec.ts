import { GenerateRandomSession } from "./Session";
import { SESSION_LENGTH } from "src/common/constants";

describe("GenerateRandomSession",()=>{
    it("Test_size_session",async ()=>{
        const res1 = GenerateRandomSession();
        expect(res1.length === SESSION_LENGTH*2).toBe(true);
        expect(typeof res1).toBe("string");
    });
});
