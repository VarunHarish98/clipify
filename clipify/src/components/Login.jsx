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
import useFetch from "@/Hooks/useFetch";
import login from "@/db/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { urlContextState } from "@/context";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let [searchParams] = useSearchParams();
  let link = searchParams.get("createNew");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { loading, error, fn: fnLogin, data } = useFetch(login, formData);
  const { fetchUser } = urlContextState();

  useEffect(() => {
    if (error === null && data)
      navigate(`/dashboard?${link ? `createNew${link}` : ""}`);
    fetchUser();
  }, [data, error]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      let formSchema = object({
        email: string().email("Email is required").required(),
        password: string().min(8, "Password is required").required(),
      });
      await formSchema.validate(formData, { abortEarly: false }); // Validate all fields, don't stop at first error
      await fnLogin();
    } catch (error) {
      let errObj = {};
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
        {error && <Error message={error} />}
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
        <Button onClick={handleLogin} className="text-black bg-white">
          {loading ? (
            <BeatLoader size={10} color="#36d7b7" />
          ) : (
            <span className="text-black">Login</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
