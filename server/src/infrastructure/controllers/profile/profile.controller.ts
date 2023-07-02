import { BadRequestException, Body, Controller, Get, HttpCode, Inject, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "src/infrastructure/common/guards/auth.guard";
import { ProfileUseCase } from "src/use-cases/profile-usecases/usecase-blocks/profile.usecase";
import { ProfileDto } from "./dto/profile.dto";
import { ProfileUseCaseModule } from "src/use-cases/profile-usecases/profile.usecases-proxy";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResultProfile } from "src/use-cases/profile-usecases/response-data/response.interfaces";
import { ValidatioPipe } from "src/infrastructure/common/pipes/validation.pipe";
import { ProfileEntity } from "@prisma/client";
import { ChangePasswordDto } from "./dto/changePassword.dto";
import { BodyCanActivate } from "../auth/dto/user.register.dto";

@Controller("/profile")
@ApiTags("Profile")
export class ProfileController {
  constructor(
    @Inject(ProfileUseCaseModule.PROFILE)
    private readonly ProfileUseCaseInstance: ProfileUseCase
  ) { };

  @Post("/update")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiBody({ type: ProfileDto })
  @ApiOperation({
    description: "Update profile"
  })
  @ApiResponse({
    type: ResultProfile.ResponseProfile,
    status: 200
  })
  @UsePipes(new ValidatioPipe())
  @ApiBearerAuth("access-token")
  public async update(@Body() dto: ProfileDto) {
    const profile = await this.ProfileUseCaseInstance.update(dto);
    return profile;
  };

  @Post("/changepassword")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiBody({ type: ChangePasswordDto })
  @ApiOperation({
    description: "Change password"
  })
  @ApiResponse({
    status: 200,
    type: ResultProfile.ResponseChangePassword
  })
  @ApiBearerAuth("access-token")
  public async change(@Body() dto: ChangePasswordDto) {
    if (dto.newPassword === dto.password) throw new BadRequestException("Not valid password");
    const user = await this.ProfileUseCaseInstance.changePassword(dto);
    return user;
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    description: "Get profile"
  })
  @ApiResponse({
    type: ResultProfile.ResponseProfile,
    status: 200
  })
  @ApiBearerAuth("access-token")
  @UseGuards(AuthGuard)
  public async get(@Body() dto: BodyCanActivate) {
    return this.ProfileUseCaseInstance.get(dto);
  };
}
