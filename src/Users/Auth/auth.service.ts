import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user.service";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "node_modules/bcryptjs";
import { UsersDto } from "users.dto";

@Injectable()
export class UserAuth {
    constructor(private userService : UserService , private jwtService : JwtService){}
        
    async validateUser(email : string , password: string){
        //find the user
        const user = await this.userService.findUserByEmail(email);
        if(!user) return null;
        //compare passwords 
        const isMatch = await bcrypt.compare(user.password , password);

        if(isMatch){
            const {password , ...rest} = user.toObject();
            return rest
        }
        return null
    }

    async login(user:any){
        const payload = {sub : user._id , email: user.email , role : user.role}
        return{
            "access_token":this.jwtService.sign(payload)
        }
    }

    async signup(dto : UsersDto){
        const user = await this.userService.create(dto);
        return this.login(user);
    }
    
}