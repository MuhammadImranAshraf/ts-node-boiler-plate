import { ObjectId } from "mongoose";
import { IUser } from "v1/interfaces/user.interface";

interface IURepository {
  create(payload: IUser): Promise<IUser>;
  findByEmail(email: IUser["email"]): Promise<IUser | undefined>;
  findById(_id: IUser["_id"]): Promise<IUser | undefined>;
  update(_id: IUser["_id"], payload: IUser): Promise<IUser>;
  delete(_id: IUser["_id"]): Promise<boolean>;
  updatePassword(_id: IUser["_id"], password: string): Promise<IUser>;
  generateAuthToken(payload: IUser): Promise<string>;
}

export default IURepository;
