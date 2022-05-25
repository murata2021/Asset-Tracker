import { useSelector, useDispatch } from "react-redux";
import Input from "./Input";
import {
  updateUser,
  deleteUser,
  deactivateUser,
  updateUserPassword,
  resetUserPassword
} from "../api/apiCalls";
import ButtonWithProgress from "./ButtonWithProgress";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import { logoutSuccess, updateSuccess } from "../state/authActions";

import Alert from "./Alert";

const ProfileCard = (props) => {
  const history = useHistory();
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();

  const [inEditMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [passwordUpdateApiProgress, setPasswordUpdateApiProgress] =
    useState(false);

  const [updateApiProgress, setUpdateApiProgress] = useState(false);
  const [deleteApiProgress, setDeleteApiProgress] = useState(false);
  const [deactivateApiProgress, setDeactivateApiProgress] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const { user, isEditted, setIsEditted } = props;

  const [editFormData, setEditFormData] = useState({
    username: user.username,
    email: user.email,
    fullName: user.fullName,
  });

  const [passwordEditFormData, setPasswordEditFormData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordRepeat: "",
  });

  const [errors, setErrors] = useState({});

  // **************************************************************//
  //PASSWORD UPDATE

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordEditFormData((data) => ({ ...data, [id]: value }));
    setErrors((errors) => ({ ...errors, [id]: null }));
  };

  const onClickSavePassword = async () => {
    setPasswordUpdateApiProgress(true);
    try {
      let response;

      if(auth.isAdmin&&auth.userId!==user.id){
        response = await resetUserPassword(
          auth.companyId,
          user.id,
          passwordEditFormData
        );
      }
      else{
        response = await updateUserPassword(
          auth.companyId,
          user.id,
          passwordEditFormData
        );
      }
      
      setPasswordEditMode(false);
      setPasswordEditFormData({
        oldPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
      });
    } catch (e) {
      if (e.response.status === 400) {
        setErrors((data) => ({ ...e.response.data.validationErrors }));
        setPasswordUpdateApiProgress(false);
      }
    }

    setPasswordUpdateApiProgress(false);
  };

  const onClickCancelPassword = () => {
    setPasswordEditMode(false);
    setPasswordEditFormData((data) => ({
      ...data,
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
    }));
    setErrors({});
  };
  // **************************************************************//
  //USER UPDATE -EXCEPT PASSWORD
  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditFormData((data) => ({ ...data, [id]: value }));
    setErrors((errors) => ({ ...errors, [id]: null }));
  };

  const deactivateTheAccount = async () => {
    setDeactivateApiProgress(true);
    try {
      if (user.inactive) {
        await deactivateUser(auth.companyId, user.id);
        setIsEditted(true);
      }
    } catch (error) {}
    setDeactivateApiProgress(false);
  };

  const onClickSave = async () => {
    setUpdateApiProgress(true);
    try {
      const response = await updateUser(auth.companyId, user.id, editFormData);
      setEditMode(false);

      if (user.id === auth.userId) {
        dispatch(
          updateSuccess({
            username: editFormData.username,
          })
        );
      }

      setIsEditted(true);
    } catch (e) {
      if (e.response.status === 400) {
        setErrors((data) => ({ ...e.response.data.validationErrors }));
        setUpdateApiProgress(false);
      }
    }

    setUpdateApiProgress(false);
  };

  const onClickCancel = () => {
    setEditMode(false);
    setEditFormData((data) => ({
      ...data,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    }));
    setErrors({});
  };

  const onClickCancelDelete = () => {
    setModalVisible(false);
  };

  const onClickDelete = async () => {
    setDeleteApiProgress(true);
    try {
      await deleteUser(auth.companyId, user.id);

      if (auth.userId === user.id) {
        history.push("/");
        dispatch(logoutSuccess());
      }
      setModalVisible(false);
      setIsEditted(true);
    } catch (error) {}
    setModalVisible(false);

    setDeleteApiProgress(false);
  };
  let content;

  const disabled =
    passwordEditFormData.newPassword ===
      passwordEditFormData.newPasswordRepeat &&
    passwordEditFormData.newPassword !== ""
      ? false
      : true;
  const passportMismatch =
    passwordEditFormData.newPassword !== passwordEditFormData.newPasswordRepeat
      ? "Password mismatch"
      : null;

  if (inEditMode) {
    content = (
      <>
        <Input
          onChange={handleChange}
          initialValue={editFormData.username}
          id="username"
          label="Change your username"
          help={errors.username}
        />
        <Input
          onChange={handleChange}
          initialValue={editFormData.email}
          id="email"
          label="Change your email"
          help={errors.email}
        />
        <Input
          onChange={handleChange}
          initialValue={editFormData.fullName}
          id="fullName"
          label="Change your full name"
          help={errors.fullName}
        />

        <div className="text-center">
          <ButtonWithProgress
            onClick={() => {
              onClickSave();
            }}
            apiProgress={updateApiProgress}
          >
            Save
          </ButtonWithProgress>
          <span
            className="divider"
            style={{ width: "5px", height: "auto", display: "inline-block" }}
          ></span>
          <button onClick={onClickCancel} className="btn btn-outline-secondary">
            Cancel
          </button>
        </div>
      </>
    );
  } else if (passwordEditMode) {
    content = (
      <>
        {(!auth.isAdmin||auth.userId===user.id)&&(<Input
          onChange={handlePasswordChange}
          initialValue={passwordEditFormData.oldPassword}
          id="oldPassword"
          label="Old Password"
          type="password"
          help={errors.oldPassword}
        />)}
        <Input
          onChange={handlePasswordChange}
          initialValue={passwordEditFormData.newPassword}
          id="newPassword"
          label="New Password"
          type="password"
          help={errors.newPassword}
        />
        <Input
          onChange={handlePasswordChange}
          initialValue={passwordEditFormData.newPasswordRepeat}
          id="newPasswordRepeat"
          label="New Password Repeat"
          type="password"
          help={passportMismatch}
        />

        <div className="text-center">
          <ButtonWithProgress
            disabled={disabled}
            onClick={() => {
              onClickSavePassword();
            }}
            apiProgress={passwordUpdateApiProgress}
          >
            Save
          </ButtonWithProgress>
          <span
            className="divider"
            style={{ width: "5px", height: "auto", display: "inline-block" }}
          ></span>
          <button
            onClick={onClickCancelPassword}
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Username:</b>{" "}
            <span style={{ fontSize: "16px" }}>{user.username}</span>
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Email:</b>{" "}
            <span style={{ fontSize: "16px" }}>{user.email}</span>{" "}
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Full Name:</b>{" "}
            <span style={{ fontSize: "16px" }}>
              {!user.fullName || user.fullName === "" ? "-" : user.fullName}
            </span>
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Role:</b>
            <span style={{ fontSize: "16px" }}>
              {" "}
              {user.isAdmin ? "System Admin" : "Technician"}
            </span>
          </p>
        </>

        <>
          <div className="text-center">
            {(auth.isAdmin || auth.userId === user.id) && (
              <button
                onClick={() => setEditMode(true)}
                className="btn btn-outline-success"
              >
                Edit
              </button>
            )}
            <span
              className="divider"
              style={{ width: "5px", height: "auto", display: "inline-block" }}
            ></span>

            {(auth.isAdmin || auth.userId === user.id) && (
              <>
                <button
                  onClick={() => setPasswordEditMode(true)}
                  className="btn btn-outline-secondary"
                >
                  Change Password
                </button>
                <span
                  className="divider"
                  style={{
                    width: "5px",
                    height: "auto",
                    display: "inline-block",
                  }}
                ></span>
              </>
            )}

            {auth.isAdmin && !user.inactive && (
              <button
                onClick={() => setModalVisible(true)}
                className="btn btn-danger"
              >
                Delete
              </button>
            )}
            {auth.isAdmin && user.inactive && (
              <ButtonWithProgress
                onClick={deactivateTheAccount}
                buttonType="warning"
                apiProgress={deactivateApiProgress}
              >
                Deactivate
              </ButtonWithProgress>
            )}
          </div>
        </>
      </>
    );
  }

  let userDeleteText =
    auth.userId !== user.id
      ? "Are you sure to delete this account?"
      : "You are the system administrator. Deleting this account will delete all company data. Are you sure to delete your account? ";

  let pageContent;

  if (auth.isAdmin || !user.inactive) {
    pageContent = (
      <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
        <div className="card">
          <div className="card-header text-center">
            {inEditMode ? "Edit Form" : user.username}
          </div>
          <div className="card-body">{content}</div>
        </div>
        {!user.inactive && modalVisible && (
          <Modal
            content={userDeleteText}
            onClickCancel={onClickCancelDelete}
            onClickConfirm={onClickDelete}
            apiProgress={deleteApiProgress}
          />
        )}
      </div>
    );
  } else {
    pageContent = (
      <div>
        <Alert type="danger" center>
          User not found
        </Alert>
      </div>
    );
  }

  return (
    <>
      {/* <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header text-center">
              {inEditMode ? "Edit Form" : user.username}
            </div>
            <div className="card-body">{content}</div>
          </div>
          {!user.inactive && modalVisible && (
            <Modal
              content={userDeleteText}
              onClickCancel={onClickCancelDelete}
              onClickConfirm={onClickDelete}
              apiProgress={deleteApiProgress}
            />
          )}
        </div>
      ) */}
      {pageContent}
    </>
  );
};

export default ProfileCard;
