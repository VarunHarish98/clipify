const error = {
  name: "ValidationError",
  value: {
    email: "",
    password: "short",
  },
  path: undefined,
  type: undefined,
  errors: ["Email is required", "Password must be at least 8 characters"],
  inner: [
    {
      name: "ValidationError",
      value: "",
      path: "email",
      type: "required",
      errors: ["Email is required"],
      inner: [],
      message: "Email is required",
      params: {
        path: "email",
        value: "",
        originalValue: "",
        label: undefined,
      },
    },
    {
      name: "ValidationError",
      value: "short",
      path: "password",
      type: "min",
      errors: ["Password must be at least 8 characters"],
      inner: [],
      message: "Password must be at least 8 characters",
      params: {
        min: 8,
        path: "password",
        value: "short",
        originalValue: "short",
        label: undefined,
      },
    },
  ],
  message: "2 errors occurred",
};
