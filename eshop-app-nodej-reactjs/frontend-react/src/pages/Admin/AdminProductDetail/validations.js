import { number, object, string } from "yup";

const validations = object({
  title: string().required("Required!"),
  description: string().min(5, "Should be min length 5 char").required(),
  price: number("Should be number").required(),
});

export default validations;
