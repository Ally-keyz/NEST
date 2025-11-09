import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../Shemas/task.schema";
import { Model } from "mongoose";
import { UsersDto } from "users.dto";
import bcrypt from "node_modules/bcryptjs";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel :Model<UserDocument>){}

    async create(createUserDto : UsersDto){
        //find it the user exists
        const exists = await this.UserModel.findOne({email:createUserDto.email});
        if(exists) throw new ConflictException("User Already exists");

        // hash the password 
        const hash = await bcrypt.hash(createUserDto.password , 10);

        // create the new user
        const create = new this.UserModel({...createUserDto , password: hash});
        return create.save();
    }

    async findUserByEmail(email : UsersDto["email"]){
        // find the users by email
        const user  = await this.UserModel.findOne({email : email})
        if(!user) throw new NotFoundException("No users found with that email")
        return user ;
    }

    async findUsersById(id : string){
        // handle finding the users
        const user = await this.UserModel.findById({id})
        if(!user) throw new NotFoundException("No user found with that id");
        return user;
    }

    // find all the existing users
    async findAllUsers(){
        const users = await this.UserModel.find();
        if(!users || users.length < 1) throw new NotFoundException("Users not found")
    }
}