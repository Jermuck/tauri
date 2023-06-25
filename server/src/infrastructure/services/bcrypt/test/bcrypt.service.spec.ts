import { Test, TestingModule } from "@nestjs/testing"
import { BcryptAbstractAdapter } from "src/domain/adapters/bcrypt-adapter/bcrypt.adapter"
import { BcryptService } from "../bcrypt.service"

describe("BcryptService", () => {
    let service: BcryptAbstractAdapter;
    beforeEach(async () => {
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                {
                    useValue:3,
                    provide:"SALT",
                },
                BcryptService
            ]
        }).compile();
        service = module.get<BcryptAbstractAdapter>(BcryptService);
    });
    let mockPasword = "test";
    let hashPassword: string;
    describe("HashingPassword", () => {
        it("It should be string", async () => {
            hashPassword = await service.hash(mockPasword);
            expect(hashPassword).toBeDefined();
        });
    });

    describe("UnhashingPassword", () => {
        it("Should be equal mockPassword", async () => {
            const unHashPassword = await service.unHash(mockPasword, hashPassword);
            expect(unHashPassword).toBeTruthy();
        });
    });
});