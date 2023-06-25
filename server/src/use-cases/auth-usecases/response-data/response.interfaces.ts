import { ApiProperty } from "@nestjs/swagger";

export namespace ResultAuthorization {

  export class RequiredUser {
    @ApiProperty()
    public username: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public description: string;

    @ApiProperty()
    public updateDate: Date;

    @ApiProperty()
    public createData: Date;
  }

  export class ResponseForAuthRequest {
    @ApiProperty()
    public access: string;

    public header: string;

    @ApiProperty()
    public user: RequiredUser;
  };

  export class Logout {
    @ApiProperty()
    public message: string;
  };

  export class Refresh {
    @ApiProperty()
    public access: string;

    public header: string;
  };
}
