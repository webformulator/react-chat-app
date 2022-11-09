import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "./FormInput.component";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    usernameError: "",
    passwordError: "",
    nameError: "",
  });
  const navigate = useNavigate();

  const validateInput = () => {
    let emailError = "",
      passwordError = "",
      usernameError = "",
      nameError = "";
    const passwordReg = /^[a-zA-Z0-9]{8,}$/;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.name) nameError = "Name is Mandatory";
    if (!formData.username) usernameError = "Username is Mandatory";
    else if (formData.username.length < 3)
      usernameError = "Username must be 3 characters long";
    if (!formData.email) emailError = "Email Address is Mandatory";
    else if (!emailRegex.test(formData.email))
      emailError = "Email must be a valid Email";
    if (!formData.password) passwordError = "Password is Mandatory";
    else if (!passwordReg.test(formData.password))
      passwordError = "Password must be Alphanumeric and 8 characters long";
    setErrors({
      emailError,
      passwordError,
      nameError,
      usernameError,
    });
    return emailError || passwordError || nameError || usernameError;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    toast.dismiss();
    event.preventDefault();
    if (validateInput()) return toast.error("Validation Error");
    console.log(formData);
    navigate("/auth/verify");
    toast.success("User Registered Successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name input */}
      <FormInput
        name="name"
        value={formData.name}
        handleChange={handleChange}
        placeholder="Name"
        error={errors.nameError}
      />
      {/* Username input */}
      <FormInput
        name="username"
        value={formData.username}
        handleChange={handleChange}
        placeholder="Username"
        error={errors.usernameError}
      />
      {/* Email input */}
      <FormInput
        name="email"
        value={formData.email}
        handleChange={handleChange}
        placeholder="Email Address"
        error={errors.emailError}
      />
      {/* Password input */}
      <FormInput
        name="password"
        type="password"
        value={formData.password}
        handleChange={handleChange}
        placeholder="Password"
        error={errors.passwordError}
      />
      <div className="text-center lg:text-left">
        <button
          type="submit"
          className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Register
        </button>
        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
          Already have an account?
          <Link
            className="ml-1 text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
