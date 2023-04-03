const obj = {
  first_name: "Ram",
  last_name: "Samarth",
  email: "ram@tech.com",
  password: "1234567",
  country: 123,
  state: 1234,
  city: "Bangalore",
};
const updatedData = {
  country: "India",
  state: "Karnataka",
};
const updatedObject = {
  ...obj,
  ...updatedData,
};
console.log(updatedObject);
