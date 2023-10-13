interface IToken {
  token: string;
}
interface IPhone {
  number: string;
  country: string;
  dialingCode: string;
}

interface IAddress {
  title?: String;
  street?: String;
  detail?: String;
  additionalInfo?: String;
  postalCode?: String;
  city?: String;
  country?: String;
}

interface ICustomer {
  _id?: string;
  fullName?: string;
  gender?: string;
  email?: string;
  password?: string;
  phone?: IPhone;
  address: IAddress;
  profileImage?: string;
  status?: boolean;
  tokens?: IToken[];
}

export { ICustomer };
