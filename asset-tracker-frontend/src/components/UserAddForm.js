import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Input from "./Input";
import { addUser, login } from "../api/apiCalls";
import Alert from "./Alert";
import ButtonWithProgress from "./ButtonWithProgress";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AddUserPage = () => {
  const INITIAL_FORM_STATE = {
    email: "",
    username: "",
    fullName: "",
    password: "",
  };
  const auth = useSelector((store) => store);

  const [apiProgress, setApiProgress] = useState(false);
  const [userCreationSuccess, setUserCreationSuccess] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((data) => ({ ...data, [id]: value }));
    setErrors((errors) => ({ ...errors, [id]: null }));
    setUserCreationSuccess(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, fullName, password } = formData;

    const body = {
      email,
      username,
      fullName,
      password,
    };
    setApiProgress(true);
    try {
      //API CALL
      const response = await addUser(body, auth.companyId);
      setUserCreationSuccess(true);
      setFormData(INITIAL_FORM_STATE)
    } catch (e) {
      if (e.response.status === 400) {
        setErrors((data) => ({ ...e.response.data.validationErrors }));
        setApiProgress(false);
      }
      setUserCreationSuccess(false);
    }
    setApiProgress(false);
  };

  const disabled = formData.password === "" ? true : false;

  return (
    <div
      className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
      data-testid="signup-page"
    >
      <form className="card" data-testid="form-add-user">
        <div className="card-header">
          <h1 className="text-center">Add User</h1>
        </div>
        <div className="card-body">
          {userCreationSuccess && <Alert>User created successfully</Alert>}
          <Input
            id="email"
            label="Email"
            onChange={handleChange}
            help={errors.email}
            value={formData.email}
          />
          <Input
            id="username"
            label="Username"
            onChange={handleChange}
            help={errors.username}
            value={formData.username}

          />
          <Input
            id="fullName"
            label="Full Name"
            onChange={handleChange}
            help={errors.fullName}
            value={formData.fullName}

          />

          <Input
            id="password"
            type="password"
            label="Password"
            onChange={handleChange}
            help={errors.password}
            value={formData.password}

          />

          <div className="text-center">
            <ButtonWithProgress
              disabled={disabled}
              apiProgress={apiProgress}
              onClick={handleSubmit}
            >
              Add User
            </ButtonWithProgress>
            <span
              className="divider"
              style={{ width: "5px", height: "auto", display: "inline-block" }}
            ></span>
            <Link className="btn btn-secondary" to="/users">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;
