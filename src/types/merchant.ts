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

export type CBranch = {
  name: string;
  branch_address: string;
  company_code: number;
  branch_email: string;
  token: string;
};

export type IBranch = {
  branch_name: string;
  company_code: number;
  branch_address: string;
  branch_email: string;
  id: number;
};

export type RBranch = {
  name: string;
  code: number;
  address: string;
  email: string;
  id: number;
};

export type UBranch = {
  name: string;
  company_code: number;
  branch_address: string;
  branch_email: string;
  id: number;
  token: string;
};
