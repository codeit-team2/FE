export interface Data {
  category: string;
  place: string;
  date: string;
  title: string;
  member: number;
  imageUrl: string;
  deadline: string;
  confirmed: boolean;
  review: boolean;
}

export type ErrorMessage = {
  nickname: {
    required: string;
    min: string;
    max: string;
    duplicate: string;
    valid: string;
  };
  email: {
    required: string;
    valid: string;
    duplicate: string;
    register: string;
  };
  code: {
    required: string;
    max: string;
    valid: string;
    auth: string;
  };
  password: {
    required: string;
    min: string;
    valid: string;
    check: string;
  };
  review: {
    required: string;
    min: string;
    max: string;
  };
  thumbnail: {
    required: string;
  };
  category: {
    required: string;
  };
  location: {
    required: string;
  };
  clubName: {
    required: string;
  };
  headcount: {
    required: string;
  };
};

export interface ErrorResponse {
  code: string;
  message: string;
}
