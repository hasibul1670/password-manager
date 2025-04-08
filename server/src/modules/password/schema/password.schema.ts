import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PasswordDocument = Password & Document;

@Schema({ timestamps: true })
export class Password {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    url: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    email: string;

    @Prop({})
    passwordId: string;
}

export const PasswordSchema = SchemaFactory.createForClass(Password);