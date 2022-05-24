import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import {
  deleteVendor,
  updateVendor,
  deleteAssetGroup,
  updateAssetGroup,
  updateCompany,
  deleteUser,
  deleteCompany,
} from "../api/apiCalls";
import ButtonWithProgress from "./ButtonWithProgress";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutSuccess } from "../state/authActions";

const CompanyProfileCard = (props) => {
  const history = useHistory();
  const auth = useSelector((store) => store);

  const dispatch=useDispatch()

  const [inEditMode, setEditMode] = useState(false);
  const [updateApiProgress, setUpdateApiProgress] = useState(false);
  const [deleteApiProgress, setDeleteApiProgress] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const { company, isEditted, setIsEditted } = props;

  const [editFormData, setEditFormData] = useState({
    companyName: company.companyName,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditFormData((data) => ({ ...data, [id]: value }));
    setErrors((errors) => ({ ...errors, [id]: null }));
  };

  const onClickSave = async () => {
    setUpdateApiProgress(true);
    try {
      const response = await updateCompany(auth.companyId, editFormData);
      setEditMode(false);
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
      companyName: company.companyName,
    }));
    setErrors({});
  };

  const onClickCancelDelete = () => {
    setModalVisible(false);
  };

  const onClickDelete = async () => {
    setDeleteApiProgress(true);
    try {
      await deleteCompany(auth.companyId);
      dispatch(logoutSuccess());
      history.push("/");

      setModalVisible(false);
      setIsEditted(true);
    } catch (error) {}
    setModalVisible(false);

    setDeleteApiProgress(false);
  };

  let content;

  if (inEditMode) {
    content = (
      <>
        <Input
          onChange={handleChange}
          initialValue={editFormData.companyName}
          id="companyName"
          label="Change Company Name"
          help={errors.companyName}
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
  } else {
    content = (
      <>
        <>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Company Name:</b>{" "}
            <span style={{ fontSize: "16px" }}>{company.companyName}</span>
          </p>
        </>

        <>
          <div className="text-center">
            <Link to="/" className="btn btn-outline-primary">
              Go Home Page
            </Link>

            <span
              className="divider"
              style={{
                width: "5px",
                height: "auto",
                display: "inline-block",
              }}
            ></span>
            {auth.isAdmin && (
              <>
                <button
                  onClick={() => setEditMode(true)}
                  className="btn btn-outline-success"
                >
                  Edit
                </button>

                <span
                  className="divider"
                  style={{
                    width: "5px",
                    height: "auto",
                    display: "inline-block",
                  }}
                ></span>

                <button
                  onClick={() => setModalVisible(true)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </>
      </>
    );
  }

  let CompanyDeleteText = "Are you sure to delete the company account?";
  return (
    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      <div className="card">
        <div className="card-header text-center">
          {inEditMode ? "Edit Form" : company.companyName}
        </div>
        <div className="card-body">{content}</div>
      </div>
      {modalVisible && (
        <Modal
          content={CompanyDeleteText}
          onClickCancel={onClickCancelDelete}
          onClickConfirm={onClickDelete}
          apiProgress={deleteApiProgress}
        />
      )}
    </div>
  );
};

export default CompanyProfileCard;
