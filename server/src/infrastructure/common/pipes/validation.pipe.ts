import { ArgumentMetadata, PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { ProfileDto } from "src/infrastructure/controllers/profile/dto/profile.dto";

@Injectable()
export class ValidatioPipe implements PipeTransform {

  private keyInProfileDto: Array<string | keyof ProfileDto> = ["_id", "name", "phone", "lastname"]

  transform(value: any, _: ArgumentMetadata) {
    const keys = Object.keys(value).filter(el => {
      if (this.keyInProfileDto.includes(el)) return el;
    });
    if (keys.length < 2) {
      throw new BadRequestException("You must change field >= 1");
    };
    return value;
  }
}
