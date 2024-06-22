export type SignInFormValues = {
  email: string;
  password: string;
};

export type UserInfoType = {
  email: string;
};

export type SignUpFormValues = {
  email: string;
  verify: number;
  password: string;
  checkPassword: string;
};

export type SignUpFormValues2 = {
  nickname: string;
  // profilePic: string;
  areaCodes: number[];
};
