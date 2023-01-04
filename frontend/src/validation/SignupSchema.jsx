import * as Yup from "yup";

const regExText = /^[a-zA-Z\s'-]{3,10}$/;
const regExEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
const regExPassword =
  /^(?=.*?[A-Z]){1}(?=.*?[a-z]){1}(?=.*?[0-9]){3}(?=.*?[^\w\s]){1}.{6}$/;

const SignupSchema = Yup.object({
  firstname: Yup.string()
    .trim()
    .required("⚠️ Provide a valid first name!")
    .matches(regExText, "⚠️ First name must be between 3 and 10 characters!"),
  lastname: Yup.string()
    .trim()
    .required("⚠️ Provide a valid last name!")
    .matches(regExText, "⚠️ Last name must be between 3 and 10 characters!"),
  email: Yup.string()
    .trim()
    .required("⚠️ Provide a valid e-mail address!")
    .matches(regExEmail, "⚠️ Format: xxxxx@gmail.com"),
  password: Yup.string()
    .trim()
    .required("⚠️ Provide a valid password!")
    .matches(
      regExPassword,
      "⚠️ Password must be 6 characters, 1 uppercase letter, 1 lowercase letter, 1 special character, 3 digits!"
    ),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password does not match!")
    .strip(),
});

export default SignupSchema;
