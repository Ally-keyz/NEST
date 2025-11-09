import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User& Document ;
export class User {
    @Prop({required:true , unique: true})
    email : string
    @Prop({required : true})
    name : string
    @Prop({required : true})
    password : string
    @Prop({ required : true})
    role : 'customer' | 'rider' | 'shop' | 'admin'
}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.index({email : 1})