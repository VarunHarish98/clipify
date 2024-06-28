import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Error from "./Error";
import { useEffect, useState } from "react";
import { object, string } from "yup";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    console.log("Value is updated", loadingIcon);
  }, [loadingIcon]);
  const handleLogin = async () => {
    setErrors([]);
    console.log(loadingIcon);
    try {
      setLoadingIcon(true);
      console.log(loadingIcon);
      let formSchema = object({
        email: string().email("Email is required").required(),
        password: string().min(8, "Password is required").required(),
      });
      await formSchema.validate(formData, { abortEarly: false }); // Validate all fields, don't stop at first error
      setLoadingIcon(false);
      console.log(loadingIcon);
    } catch (error) {
      let errObj = {};
      setLoadingIcon(false);
      console.log(loadingIcon);
      error.inner?.forEach((err) => (errObj[err.path] = err.message)); //Refer mockYupError file for structure
      setErrors(errObj);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account, if you already have one
        </CardDescription>
        <Error message={"Some email error"} />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="space-y-1">
            <Input
              name="email"
              placeholder="Enter your email"
              type="email"
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              placeholder="Enter password"
              type="password"
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin} className="text-black">
          {loadingIcon ? <BeatLoader size={10} color="#36d7b7" /> : Login}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
