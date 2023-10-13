import { ICustomer } from "v1/interfaces/customer.interface";

interface ICustomerRepository {
  create(payload: ICustomer): Promise<ICustomer>;
  findByEmail(email: ICustomer["email"]): Promise<ICustomer | undefined>;
  findById(_id: ICustomer["_id"]): Promise<ICustomer | undefined>;
  update(payload: ICustomer): Promise<ICustomer>;
  delete(_id: ICustomer["_id"]): Promise<boolean>;
  generateAuthToken(payload: ICustomer): Promise<string>;
}

export default ICustomerRepository;
