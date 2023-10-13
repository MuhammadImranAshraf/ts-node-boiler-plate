import { ICustomer } from "v1/interfaces/customer.interface";
import ICustomerRepository from "./interfaces/ICustomerRepository.interface";
import customerModel from "models/customer.model";
import IAuthenticatedRequest from "v1/types/auth_request";
import { IAuthenticatedUserPayload } from "v1/shared/services/interfaces/auth_user.interface";
import { AuthTokenService } from "v1/shared/services/jwt.service";

class CustomerRepository implements ICustomerRepository {
  super() {}

  async create(payload: ICustomer): Promise<ICustomer> {
    const customer = await customerModel.create(payload);
    return customer;
  }
  async findById(_id: string): Promise<ICustomer> {
    const customer = await customerModel.findById(_id);
    return customer;
  }
  async findByEmail(email: string): Promise<ICustomer> {
    const customer = await customerModel.findOne({ email });
    return customer;
  }
  async update(payload: ICustomer): Promise<ICustomer> {
    const customer = await customerModel.findByIdAndUpdate(
      payload._id,
      { $set: payload },
      { new: true }
    );
    return customer;
  }
  async delete(_id: string): Promise<boolean> {
    const deleted = await customerModel.deleteOne({ _id });
    return deleted?.deletedCount > 0 ? true : false;
  }
  generateAuthToken = async (customer: ICustomer): Promise<string> => {
    let payload: IAuthenticatedUserPayload = {
      _id: customer?._id,
      email: customer.email,
    };

    let jwtToken = AuthTokenService.sign(payload);
    await customerModel.findByIdAndUpdate(customer._id, {
      $set: {
        $push: { tokens: jwtToken },
      },
    });
    return jwtToken;
  };
}

export default CustomerRepository;
