import { useSelector } from "react-redux";
import Input from "./Input";
import {
  deleteVendor,
  updateVendor,
  deleteAssetGroup,
  updateAssetGroup,
} from "../api/apiCalls";
import ButtonWithProgress from "./ButtonWithProgress";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const AssetGroupProfileCard = (props) => {
  const history = useHistory();
  const auth = useSelector((store) => store);

  const [inEditMode, setEditMode] = useState(false);
  const [updateApiProgress, setUpdateApiProgress] = useState(false);
  const [deleteApiProgress, setDeleteApiProgress] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const { assetGroup, isEditted, setIsEditted } = props;

  const [editFormData, setEditFormData] = useState({
    assetGroupName: assetGroup.assetGroupName,
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
      const response = await updateAssetGroup(
        auth.companyId,
        assetGroup.id,
        editFormData
      );
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
      assetGroupName: assetGroup.assetGroupName,
    }));
    setErrors({});
  };

  const onClickCancelDelete = () => {
    setModalVisible(false);
  };

  const onClickDelete = async () => {
    setDeleteApiProgress(true);
    try {
      await deleteAssetGroup(auth.companyId, assetGroup.id);

      history.push("/asset-groups");
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
          initialValue={editFormData.assetGroupName}
          id="assetGroupName"
          label="Change Asset Group Name"
          help={errors.assetGroupName}
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
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>
              Asset Group Name:
            </b>{" "}
            <span style={{ fontSize: "16px" }}>
              {assetGroup.assetGroupName}
            </span>
          </p>
        </>

        <>
          <div className="text-center">
            <span>
              <Link
                to={`/asset-groups/${assetGroup.id}/assets`}
                className="btn btn-outline-primary"
              >
                Check Assets
              </Link>
            </span>

            <span
              className="divider"
              style={{ width: "5px", height: "auto", display: "inline-block" }}
            ></span>
            {assetGroup.assetGroupName === "miscellaneous" ? (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="miscellaneous asset group cannot be edited"
              >
                <button
                  onClick={() => setEditMode(true)}
                  className="btn btn-outline-success"
                  disabled
                >
                  Edit
                </button>
              </span>
            ) : (
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

            {assetGroup.assetGroupName === "miscellaneous" ? (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="miscellaneous asset group cannot be deleted"
              >
                <button
                  onClick={() => setModalVisible(true)}
                  className="btn btn-danger"
                  disabled={
                    assetGroup.assetGroupName === "miscellaneous" ? true : false
                  }
                >
                  Delete
                </button>
              </span>
            ) : (
              <button
                onClick={() => setModalVisible(true)}
                className="btn btn-danger"
              >
                Delete
              </button>
            )}
          </div>
        </>
      </>
    );
  }

  let AssetGroupDeleteText = "Are you sure to delete this asset group?";
  return (
    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      <div className="card">
        <div className="card-header text-center">
          {inEditMode ? "Edit Form" : assetGroup.assetGroupName}
        </div>
        <div className="card-body">{content}</div>
      </div>
      {modalVisible && (
        <Modal
          content={AssetGroupDeleteText}
          onClickCancel={onClickCancelDelete}
          onClickConfirm={onClickDelete}
          apiProgress={deleteApiProgress}
        />
      )}
    </div>
  );
};

export default AssetGroupProfileCard;
