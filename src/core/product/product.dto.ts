import { IsEmail, IsNotEmpty } from 'class-validator';

export class createProductInput {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  describe: string;
  @IsNotEmpty()
  picture: string;
  @IsNotEmpty()
  addOn: object;
}
