import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    otp?: string; 

    @Prop()
    otpExpiresAt?: Date;

    @Prop({ default: false })
    isOtpVerified: boolean;

    @Prop()
    accessToken?: string;

    @Prop()
    accessTokenExpiresAt?: Date;

    @Prop()
    refreshToken?: string;

    @Prop()
    refreshTokenExpiresAt?: Date;

    @Prop({ default: 0 })
    otpAttempts: number; 
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
