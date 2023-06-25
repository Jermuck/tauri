import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtAdapter } from "../jwt.service";
import { ConfigModule } from "@nestjs/config";
import { UserEntity } from "@prisma/client";

describe("JwtService", () => {
  let service: JwtAdapter;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({}),
        ConfigModule.forRoot({
          envFilePath: `.env`
        })
      ],
      providers: [
        JwtAdapter
      ],
    }).compile();
    service = module.get<JwtAdapter>(JwtAdapter);
  });

  it("should be defined", () => {
    expect(service).toBeDefined()
  });

  const mockData = {
    id: 1,
    username: "Test",
    password: "String",
    description: "I am Testing",
    email: "test@mail.ru",
  } as UserEntity;
  let token: string;

  describe("GeneratingToken", () => {
    it("Should be string", () => {
      token = service.create(mockData, 10 ** 5);
      expect(token).toBeDefined();
    });
  });

  describe("UnhashingToken", () => {
    it("Should be mockData", async () => {
      const data = service.validateToken(token);
      expect(data).toMatchObject(mockData)
    });
  });
});
