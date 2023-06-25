import { Body, Controller, Get, HttpCode, Inject, Post, Request, Res, UseGuards } from "@nestjs/common";
import { AuthUseCaseModule } from "src/use-cases/auth-usecases/auth.usecases-proxy";
import { BodyCanActivate, UserRegisterDto } from "./dto/user.register.dto";
import { Request as Req, Response } from "express";
import { ApiBearerAuth, ApiBody, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthUseCase } from "src/use-cases/auth-usecases/usecase-blocks/auth.usecase";
import { UserLoginDto } from "./dto/user.login.dto";
import { AuthGuard } from "src/infrastructure/common/guards/auth.guard";
import { ResultAuthorization } from "../../../use-cases/auth-usecases/response-data/response.interfaces";

@Controller("/auth")
@ApiTags("Authorization")
export class AuthController {
  constructor(
    @Inject(AuthUseCaseModule.AUTHORIZATION)
    private readonly AuthorizationUseCaseInstanse: AuthUseCase
  ) { };

  @Post("/register")
  @HttpCode(200)
  @ApiBody({ type: UserRegisterDto })
  @ApiOperation({ description: "Registration" })
  @ApiResponse({
    type: ResultAuthorization.ResponseForAuthRequest,
    status: 200
  })
  public async register(@Body() dto: UserRegisterDto, @Request() req: Req) {
    const { access, header, user } = await this.AuthorizationUseCaseInstanse.register(dto);
    req.res.setHeader("Set-Cookie", header);
    return { access, user };
  };

  @Post("/login")
  @HttpCode(200)
  @ApiBody({ type: UserLoginDto })
  @ApiOperation({ description: "Login" })
  @ApiResponse({
    type: ResultAuthorization.ResponseForAuthRequest,
    status: 200
  })
  public async login(@Body() dto: UserLoginDto, @Request() req: Req) {
    const { access, header, user } = await this.AuthorizationUseCaseInstanse.login(dto);
    req.res.setHeader("Set-Cookie", header);
    return { access, user };
  };

  @Post("/logout")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({ description: "Logout" })
  @ApiBearerAuth("access-token")
  @ApiResponse({
    type: ResultAuthorization.Logout,
    status: 200
  })
  public async logout(@Body() dto: BodyCanActivate, @Res({ passthrough: true }) res: Response) {
    const result = await this.AuthorizationUseCaseInstanse.logout(dto._id);
    res.clearCookie("Refresh");
    return result;
  };

  @Get("/refresh")
  @HttpCode(200)
  @ApiOperation({ description: "Refresh" })
  @ApiResponse({
    type: ResultAuthorization.Refresh,
    status: 200
  })
  @ApiCookieAuth()
  public async refresh(@Request() req: Req) {
    const { access, header } = await this.AuthorizationUseCaseInstanse.refresh(req.cookies["Refresh"]);
    req.res.setHeader("Set-Cookie", header);
    return { access };
  };
}
