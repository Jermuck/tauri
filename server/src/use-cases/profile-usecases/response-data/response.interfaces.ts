import { ApiProperty } from "@nestjs/swagger";

export namespace ResultProfile {
  export class ResponseProfile {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly lastname: string;

    @ApiProperty()
    public readonly phone: string;

    @ApiProperty()
    public readonly userId: number;
  }

  export class ResponseChangePassword {
    @ApiProperty()
    public readonly password: string;
  }
}
