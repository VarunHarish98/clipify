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
import { signUpUser } from "@/db/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { urlContextState } from "@/context";

const SignUp = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    profile_pic: null,
  });
  let [searchParams] = useSearchParams();
  let link = searchParams.get("createNew");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };
  const { loading, error, fn: fnSignUp, data } = useFetch(signUpUser, formData);
  const { fetchUser } = urlContextState();

  useEffect(() => {
    if (!error && data)
      navigate(`/dashboard?${link ? `createNew${link}` : ""}`);
    fetchUser();
  }, [data, error]);

  const handleSignUp = async () => {
    setErrors([]);
    try {
      let formSchema = object({
        name: string().required("Please enter your name"),
        email: string().email("Email is required").required(),
        password: string().min(8, "Password is required").required(),
      });
      await formSchema.validate(formData, { abortEarly: false }); // Validate all fields, don't stop at first error
      await fnSignUp();
    } catch (error) {
      let errObj = {};
      error.inner?.forEach((err) => (errObj[err.path] = err.message)); //Refer mockYupError file for structure
      setErrors(errObj);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>
          Create a new account if you havent already
        </CardDescription>
        {error && <Error message={error} />}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="space-y-1">
            <Input
              name="name"
              placeholder="Enter your name"
              type="name"
              onChange={handleInputChange}
            />
            {errors.name && <Error message={errors.name} />}
          </div>
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
          <div className="space-y-1">
            <Input
              name="profile_pic"
              accept="image/*"
              type="file"
              onChange={handleInputChange}
            />
            {errors.profile_pic && <Error message={errors.profile_pic} />}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignUp} className="text-black bg-white">
          {loading ? (
            <BeatLoader size={10} color="#36d7b7" />
          ) : (
            <span className="text-black">SignUp</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
