import { IsBoolean, IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Frequency } from './frequency.enum';
import { OmitType } from '@nestjs/mapped-types';


export class Subscription  {

  id?: number;
  
  @IsString()
  @ApiProperty({ example: 'Jonhy Rocket', description: 'The subscriber\'s name' })
  subscriberName?: string;

  @IsEmail()
  @ApiProperty({ example: 'johny@noemail.com', description: 'The subscriber\'s email' })
  email?: string;

  @IsBoolean()
  isEmailVerified?: boolean;

  @IsString()
  @ApiProperty({ example: '2022-01-16 11:44:25', description: 'The subscription time' })
  subscriptionTime?: string;

  @IsString()
  @ApiProperty({ example: 'Rwanda', description: 'The country of the subscriber' })
  subscriberCountry?: string;

  @IsString()
  @ApiProperty({ example: 'weekely', description: 'The subscription frequency' })
  frequency?: Frequency 
}

export class CreateSubscription extends OmitType(Subscription, ['isEmailVerified'] as const) {
  @IsString()
  @ApiProperty({ example: 'Jonhy Rocket', description: 'The subscriber\'s name' })
  subscriberName?: string;

  @IsEmail()
  @ApiProperty({ example: 'johny@noemail.com', description: 'The subscriber\'s email' })
  email?: string;

  @IsString()
  @ApiProperty({ example: '2022-01-16 11:44:25', description: 'The subscription time' })
  subscriptionTime?: string;

  @IsString()
  @ApiProperty({ example: 'Rwanda', description: 'The country of the subscriber' })
  subscriberCountry?: string;

  @IsString()
  @ApiProperty({ example: 'weekely', description: 'The subscription frequency' })
  frequency?: Frequency 
}
