const SignupFormFields = [
  {
    name: "name.first",
    placeholder: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "name.middle",
    placeholder: "Middle Name",
    type: "text",
    required: false,
  },
  {
    name: "name.last",
    placeholder: "Last Name",
    type: "text",
    required: true,
  },
  { name: "phone", placeholder: "Phone", type: "tel", required: true },
  { name: "email", placeholder: "Email", type: "email", required: true },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    required: true,
  },
  {
    name: "image.url",
    placeholder: "Image URL",
    type: "text",
    required: false,
  },
  {
    name: "image.alt",
    placeholder: "Image Alt Text",
    type: "text",
    required: false,
  },
  {
    name: "address.state",
    placeholder: "State",
    type: "text",
    required: false,
  },
  {
    name: "address.country",
    placeholder: "Country",
    type: "text",
    required: true,
  },
  { name: "address.city", placeholder: "City", type: "text", required: true },
  {
    name: "address.street",
    placeholder: "Street",
    type: "text",
    required: true,
  },
  {
    name: "address.houseNumber",
    placeholder: "House Number",
    type: "number",
    required: true,
  },
  {
    name: "address.zip",
    placeholder: "ZIP Code",
    type: "number",
    required: false,
  },
];

export default SignupFormFields;
