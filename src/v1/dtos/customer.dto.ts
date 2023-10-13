import { ICustomer } from "v1/interfaces/customer.interface";

export const transformCustomer = (customer: ICustomer) => {
  return {
    fullName: customer?.fullName,
    gender: customer?.gender,
    email: customer?.email,
    phone: customer?.phone,
    address: customer?.address,
  };
};
