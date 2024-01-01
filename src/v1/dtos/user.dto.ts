import { IUser } from "v1/interfaces/user.interface";

export const UserDTOsApp = (user: IUser) => {
  return {
    fullName: user?.fullName,
    profileImage: user?.profileImage,
    gender: user?.gender,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  };
};
