import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Alert from "../components/Alert";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../state/authActions";
import { signUp } from "../api/apiCalls";

const SignUpPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [apiProgress, setApiProgress] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    username: "",
    fullName: "",
    password: "",
    passwordRepeat: "",
  });
  const [errors,setErrors]=useState({})


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((data) => ({ ...data, [id]: value }));
    setErrors(errors=>({...errors,[id]:null}))
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, companyName, username, fullName, password } = formData;

    const body = {
      email,
      companyName,
      username,
      fullName,
      password,
    };
    setApiProgress(true);
    try {
      //API CALL
      const response = await signUp(body);
      setSignUpSuccess(true);

      dispatch(
        loginSuccess({
          userId:response.data.userId,
          companyId:response.data.companyId,
          username,
          header: `Bearer ${response.data.token}`,
          isAdmin:true
        })
      );
      history.push("/");
    } catch (e) {
        if(e.response.status===400){
                setErrors(data=>({...e.response.data.validationErrors}))
                setApiProgress(false)
            }
    }
    setApiProgress(false)

  };

  const disabled =
    formData.password === formData.passwordRepeat && formData.password !== ""
      ? false
      : true;
  const passportMismatch =
    formData.password !== formData.passwordRepeat ? "Password mismatch" : null;

  return (
    <div
      className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
      data-testid="signup-page" 
    >
      {!signUpSuccess && (
        <form className="card" data-testid="form-sign-up" >
          <div className="card-header">
            <h1 className="text-center">Sign Up</h1>
          </div>
          <div className="card-body">
            <Input
              id="companyName"
              label="Company Name"
              onChange={handleChange}
              help={errors.companyName}
            />

            <Input
              id="email"
              label="Email"
              onChange={handleChange}
              help={errors.email}
            />
            <Input
              id="username"
              label="Username"
              onChange={handleChange}
              help={errors.username}
            />
            <Input
              id="fullName"
              label="Full Name"
              onChange={handleChange}
              help={errors.fullName}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              onChange={handleChange}
              help={errors.password}
            />
            <Input
              id="passwordRepeat"
              type="password"
              label="Password Repeat"
              onChange={handleChange}
              help={passportMismatch}
            />
            <div className="text-center">
              <ButtonWithProgress
                disabled={disabled}
                apiProgress={apiProgress}
                onClick={handleSubmit}
              >
                Sign Up
              </ButtonWithProgress>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;
