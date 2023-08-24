import { object, string } from "yup";

export const registerSchema = object().shape({
  username: string()
    .required("Username is required")
    .min(3),
  password: string()
    .required('No password provided.')
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

