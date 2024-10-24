import {model, Schema} from "mongoose"
import { IUser } from "../utilities/interface"


const userSchema = new Schema ({
    username: {
        type : String , required : true},
    password : {
        type: String , unique : true
    }
}, {
    timestamps: true
});

export default model<IUser>("User", userSchema)