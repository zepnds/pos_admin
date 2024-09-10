export type Business = {
  id: number;
  name: string;
  address: string;
  email: string;
  type: string;
  token?: string;
};

export type UBusiness = {
  id: number | string;
  name: string;
  merchant_address: string;
  merchant_email: string;
  merchant_type: string;
  token: string;
};

export type CBusiness = {
  id: number | string;
  name: string;
  merchant_address: string;
  merchant_email: string;
  merchant_type: string;
  token: string;
};
