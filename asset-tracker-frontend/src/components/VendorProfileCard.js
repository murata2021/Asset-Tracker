import { useSelector } from "react-redux";
import Input from "./Input";
import { deleteVendor,updateVendor } from "../api/apiCalls";
import ButtonWithProgress from "./ButtonWithProgress";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";


const VendorProfileCard = (props) => {
  const history = useHistory();
  const auth = useSelector((store) => store);

  const [inEditMode, setEditMode] = useState(false);
  const [updateApiProgress, setUpdateApiProgress] = useState(false);
  const [deleteApiProgress, setDeleteApiProgress] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const { vendor, isEditted, setIsEditted } = props;

  const [editFormData, setEditFormData] = useState({
    vendorName: vendor.vendorName,
    contactPerson: vendor.contactPerson,
    email:vendor.email,
    notes: vendor.notes,
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
      const response = await updateVendor(auth.companyId, vendor.id, editFormData);
      
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
      vendorName: vendor.vendorName,
      contactPerson: vendor.contactPerson,
      email: vendor.email,
      notes: vendor.notes,
    }));
    setErrors({})
  };

  const onClickCancelDelete = () => {
    setModalVisible(false);
  };

  const onClickDelete = async () => {
    setDeleteApiProgress(true);
    try {
      await deleteVendor(auth.companyId, vendor.id);

    history.push("/vendors");
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
          initialValue={editFormData.vendorName}
          id="vendorName"
          label="Change Vendor Name"
          help={errors.vendorName}
        />
        <Input
          onChange={handleChange}
          initialValue={editFormData.contactPerson}
          id="contactPerson"
          label="Change Contact Person"
          help={errors.contactPerson}
        />
        <Input
          onChange={handleChange}
          initialValue={editFormData.email}
          id="email"
          label="Change E-mail"
          help={errors.email}
        />
        <Input
          onChange={handleChange}
          initialValue={editFormData.notes}
          id="notes"
          label="Change Notes"
          help={errors.notes}
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
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Vendor Name:</b>{" "}
            <span style={{ fontSize: "16px" }}>{vendor.vendorName}</span>
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Contact Person:</b>{" "}
            <span style={{ fontSize: "16px" }}>{vendor.contactPerson}</span>{" "}
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>E-mail:</b>{" "}
            <span style={{ fontSize: "16px" }}>{vendor.email}</span>{" "}
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Notes:</b>{" "}
            <span style={{ fontSize: "16px" }}>
              {!vendor.notes|| vendor.notes === "" ? "-" : vendor.notes}
            </span>
          </p>
        </>

        <>
          <div className="text-center">
          <span>
<Link to={`/vendors/${vendor.id}/assets`}
        className="btn btn-outline-primary"
      >
        Check Assets 
      </Link>
      </span>

<span
    className="divider"
    style={{ width: "5px", height: "auto", display: "inline-block" }}
  ></span>
              <button
                onClick={() => setEditMode(true)}
                className="btn btn-outline-success"
              >
                Edit
              </button>
            <span
              className="divider"
              style={{ width: "5px", height: "auto", display: "inline-block" }}
            ></span>
              <button
                onClick={() => setModalVisible(true)}
                className="btn btn-danger"
              >
                Delete
              </button>
            
          </div>
        </>
      </> 
    );
  }

  let VendorDeleteText ="Are you sure to delete this vendor?"
  return (
    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      <div className="card">
        <div className="card-header text-center">
          {inEditMode ? "Edit Form" : vendor.vendorName}
        </div>
        <div className="card-body">{content}</div>
      </div>
      { modalVisible && (
        <Modal
          content={VendorDeleteText}
          onClickCancel={onClickCancelDelete}
          onClickConfirm={onClickDelete}
          apiProgress={deleteApiProgress}
        />
      )}
    </div>
  );
};

export default VendorProfileCard;
