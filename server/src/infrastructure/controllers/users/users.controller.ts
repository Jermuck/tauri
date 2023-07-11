import { Controller, Get, HttpCode, Inject, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserAbstractReposiotory } from "src/domain/repositories/user-repository/user-repository.abstract";
import { AuthGuard } from "src/infrastructure/common/guards/auth.guard";
import { ResultAuthorization } from "src/use-cases/auth-usecases/response-data/response.interfaces";

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(
    @Inject("Repository")
    private readonly users: UserAbstractReposiotory
  ) { };

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Get users',
  })
  @ApiResponse({
    type: [ResultAuthorization.RequiredUser]
  })
  @ApiBearerAuth('access-token')
  public async findAll() {
    return this.users.findAll();
  };
}
