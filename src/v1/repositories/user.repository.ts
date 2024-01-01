import IURepository from "./interfaces/IURepository.interface";
import { AuthTokenService } from "v1/shared/services/jwt.service";
import User from "models/user.model";
import { IUser } from "v1/interfaces/user.interface";

class UserRepository implements IURepository {
  super() {}

  async create(payload: IUser): Promise<IUser> {
    const user = await User.create(payload);
    return user;
  }
  async findById(_id: string): Promise<IUser> {
    const user = await User.findById(_id);
    return user;
  }
  async findByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ email });
    return user;
  }

  //In case when we are sending reset token in url to verify by get request
  // async findByResetToken(
  //   passwordResetToken: IUser["passwordResetToken"]
  // ): Promise<IUser> {
  //   const hashedToke: string = crypto
  //     .createHash("sha256")
  //     //@ts-ignore
  //     .update(passwordResetToken)
  //     .digest("hex");

  //   const user = await User.findOne({ passwordResetToken: hashedToke });
  //   return user;
  // }

  async update(_id: IUser["_id"], payload: IUser): Promise<IUser> {
    const user = await User.findByIdAndUpdate(
      _id,
      { $set: payload },
      { new: true }
    );
    return user;
  }
  async delete(_id: string): Promise<boolean> {
    const deleted = await User.deleteOne({ _id });
    return deleted?.deletedCount > 0 ? true : false;
  }

  async createPasswordResetToken(user: IUser): Promise<string> {
    const resetToken = user.createPasswordResetToken();
    await user.save();
    return resetToken;
  }

  //password encryption on pre("save") hook only trigger on .save func()
  async updatePassword(_id: IUser["_id"], password: string): Promise<IUser> {
    let user = await this.findById(_id);
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordTokenExpiry = undefined;
    user.isTokenVerified = undefined;
    user.passwordChangedAt = Date.now();
    user.tokens = [];
    await user.save();
    return user;
  }

  generateAuthToken = async (user: IUser): Promise<string> => {
    let jwtToken = await AuthTokenService.sign({
      _id: user._id,
      email: user.email,
    });

    user.tokens.push(jwtToken);
    await user.save();

    const aaa = await User.findByIdAndUpdate(user._id, {
      $set: { $push: { tokens: jwtToken } },
    });

    return jwtToken;
  };

  logout = async (user: IUser): Promise<boolean> => {
    user.tokens = [];
    await user.save();
    return true;
  };
}

export default UserRepository;
