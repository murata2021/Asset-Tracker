import { useSelector } from "react-redux";
import Input from "./Input";
import { updateAsset, deleteAsset } from "../api/apiCalls";
import ButtonWithProgress from "./ButtonWithProgress";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";
import { useState,useRef } from "react";

import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";

//Calendar/Date fields
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Currency Fields
import CurrencyInput from "react-currency-input-field";

const AssetProfileCard = (props) => {

    const { asset, isEditted, setIsEditted,statusOptions,vendorOptions,assetGroupOptions } = props;


     /***************************************************************/
  /*TO CONTROL REACT SELECT INPUT FIELDS*/
  const selectAssetGroupInputRef = useRef();
  const selectVendorInputRef = useRef();
  const selectStatusInputRef = useRef();


  function clearSelected() {
    selectAssetGroupInputRef.current.clearValue();
    selectVendorInputRef.current.clearValue();
    selectStatusInputRef.current.clearValue();
  }
  /***************************************************************/
  /*SELECT FIELDS STATE CONTROL*/ 

  const ASSET_GROUP_FIELD_INITIAL_STATE={
    value: asset.assetgroupId || null,
    label: asset.assetgroup?asset.assetgroup.assetGroupName:null,
  }

  const VENDOR_FIELD_INITIAL_STATE={
    value: (!asset.vendor||asset.vendor.length===0?null:asset.vendor[0].id),
    label: (!asset.vendor||asset.vendor.length===0?null:asset.vendor[0].vendorName),
  }

  const STATUS_FIELD_INITIAL_STATE={
    value: (!asset.status||asset.status.length===0?null:asset.status[0].id),
    label: (!asset.status||asset.status.length===0?null:asset.status[0].statusName),
  }


  const [assetGroupSelectFieldValue, setAssetGroupSelectFieldValue] = useState(ASSET_GROUP_FIELD_INITIAL_STATE);
  const [vendorSelectFieldValue, setVendorSelectFieldValue] = useState(VENDOR_FIELD_INITIAL_STATE);
  const [statusSelectFieldValue, setStatusSelectFieldValue] = useState(STATUS_FIELD_INITIAL_STATE);
/*********************************/ 
  const history = useHistory();
  const auth = useSelector((store) => store);

  const [inEditMode, setEditMode] = useState(false);
  const [updateApiProgress, setUpdateApiProgress] = useState(false);
  const [deleteApiProgress, setDeleteApiProgress] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [editFormData, setEditFormData] = useState({
    assetName: asset.assetName,
    serialCode: asset.serialCode,
    assetgroupId: asset.assetgroupId,
    vendorId: asset.vendorId,
    statusCode: asset.statusCode,
    acquisitionDate: asset.acquisitionDate&&asset.acquisitionDate!==null?asset.acquisitionDate.slice(0,10):asset.acquisitionDate,
    saleDate: asset.saleDate&&asset.saleDate!==null?asset.saleDate.slice(0,10):asset.saleDate,
    purchasingCost: asset.purchasingCost,
    currentValue: asset.currentValue,
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
      const response = await updateAsset(
        auth.companyId,
        asset.id,
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
      assetName: asset.assetName,
      serialCode: asset.serialCode,
      assetgroupId: asset.assetgroupId,
      vendorId: asset.vendorId,
      statusCode: asset.statusCode,
      acquisitionDate: asset.acquisitionDate&&asset.acquisitionDate!==null?asset.acquisitionDate.slice(0,10):asset.acquisitionDate,
      saleDate: asset.saleDate&&asset.saleDate!==null?asset.saleDate.slice(0,10):asset.saleDate,
      purchasingCost: asset.purchasingCost,
      currentValue: asset.currentValue,
    }));

    setAssetGroupSelectFieldValue(ASSET_GROUP_FIELD_INITIAL_STATE)
    setVendorSelectFieldValue(VENDOR_FIELD_INITIAL_STATE)
    setStatusSelectFieldValue(STATUS_FIELD_INITIAL_STATE)
    setErrors({});
  };

  const onClickCancelDelete = () => {
    setModalVisible(false);
  };

  const onClickDelete = async () => {
    setDeleteApiProgress(true);
    try {
      await deleteAsset(auth.companyId, asset.id);

      history.push("/assets");
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
        <div className="row g-3">
          <div className="col-md-6">
            <Input
              id="assetName"
              label="Change Asset Name"
              onChange={handleChange}
              help={errors.assetName}
              initialValue={editFormData.assetName}
            />
          </div>
          <div className="col-md-6">
            <Input
              id="serialCode"
              label="Change Serial Code"
              onChange={handleChange}
              help={errors.serialCode}
              initialValue={editFormData.serialCode}
            />
          </div>
          <div className="col-md-6">
                  <label
                    className="form-label"
                    id="aria-label"
                    htmlFor="assetGroup"
                  >
                    Change Asset Group
                  </label>
                  <div className="input-group mb-3">
                    <Select
                      ref={selectAssetGroupInputRef}
                      id="assetGroup"
                      aria-labelledby="aria-label"
                      aria-describedby="button-addon1"
                      components={makeAnimated}
                      options={assetGroupOptions}
                      className={
                        errors.assetgroupId
                          ? "form-control is-invalid  p-0"
                          : " form-control p-0"
                      }
                      placeholder="Asset Group"
                      isSearchable
                      autoFocus
                      onChange={(event) => {
                        let val = !event ? null : event.value;
                        let label = !event ? null : event.label;
                        setEditFormData((data) => ({ ...data, assetgroupId: val }));
                        setErrors((errors) => ({
                          ...errors,
                          assetgroupId: null,
                        }));
                        setAssetGroupSelectFieldValue((data) => ({
                          ...data,
                          label: label,
                          value: val,
                        }));
                      }}
                      noOptionsMessage={() => "No Asset Group found"}
                      closeMenuOnSelect={false}
                      isClearable
                      value={
                        assetGroupSelectFieldValue.value !== null
                          ? assetGroupSelectFieldValue
                          : null
                      }
                    />
                    {errors.assetgroupId && (
                      <span className="invalid-feedback">
                        {errors.assetgroupId}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <label
                    className="form-label"
                    id="aria-label"
                    htmlFor="vendor"
                  >
                    Change Vendor
                  </label>
                  <div className="input-group mb-3">
                    <Select
                      ref={selectVendorInputRef}
                      id="vendor"
                      aria-describedby="button-addon2"
                      aria-labelledby="aria-label"
                      components={makeAnimated}
                      options={vendorOptions}
                      className={
                        errors.vendorId
                          ? "form-control is-invalid  p-0"
                          : " form-control p-0"
                      }
                      placeholder="Vendor"
                      isSearchable
                      autoFocus
                      onChange={(event) => {
                        let val = !event  ? null : event.value;
                        let label = !event  ? null : event.label;

                        setEditFormData((data) => ({ ...data, vendorId: val }));
                        setErrors((errors) => ({ ...errors, vendorId: null }));
                        setVendorSelectFieldValue((data) => ({
                          ...data,
                          label: label,
                          value: val,
                        }));
                      }}
                      noOptionsMessage={() => "No Vendor found"}
                      closeMenuOnSelect={false}
                      isClearable
                      value={
                        vendorSelectFieldValue.value !== null
                          ? vendorSelectFieldValue
                          : null
                      }
                    />

                    {errors.vendorId && (
                      <span className="invalid-feedback">
                        {errors.vendorId}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="purchasingCost">
                    Purchasing Cost
                  </label>

                  <CurrencyInput
                    id="purchasingCost"
                    className={
                      errors.purchasingCost
                        ? "form-control is-invalid mb-2"
                        : "form-control mb-2"
                    }
                    intlConfig={{ locale: "en-US", currency: "USD" }}
                    name="purchasingCost"
                    decimalsLimit={2}
                    onValueChange={(value) => {
                      setEditFormData((data) => ({
                        ...data,
                        purchasingCost: value,
                      }));
                      setErrors((errors) => ({
                        ...errors,
                        purchasingCost: null,
                      }));
                    }}
                    value={editFormData.purchasingCost}                    
                  />
                  {errors.purchasingCost && (
                    <span className="invalid-feedback">
                      {errors.purchasingCost}
                    </span>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="currentValue">
                    Current Value
                  </label>

                  <CurrencyInput
                    id="currentValue"
                    className={
                      errors.currentValue
                        ? "form-control is-invalid mb-2"
                        : "form-control mb-2"
                    }
                    intlConfig={{ locale: "en-US", currency: "USD" }}
                    name="currentValue"
                    decimalsLimit={2}
                    onValueChange={(value) => {
                      setEditFormData((data) => ({ ...data, currentValue: value }));
                      setErrors((errors) => ({
                        ...errors,
                        currentValue: null,
                      }));
                    }}
                    value={editFormData.currentValue}
                  />
                  {errors.currentValue && (
                    <span className="invalid-feedback">
                      {errors.currentValue}
                    </span>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="acquisitionDate">
                    Acquisition Date
                  </label>
                  <DatePicker
                    id="acquisitionDate"
                    className={
                      errors.acquisitionDate
                        ? "form-control is-invalid mb-2 "
                        : "form-control mb-2"
                    }
                    selected={editFormData.acquisitionDate&&editFormData.acquisitionDate!==''?new Date(editFormData.acquisitionDate.slice(0,10)):null}
                    onChange={(date) => {
                      setEditFormData((data) => ({
                        ...data,
                        acquisitionDate: date,
                      }));
                      setErrors((errors) => ({
                        ...errors,
                        acquisitionDate: null,
                      }));
                    }}
                    isClearable
                    withPortal
                    strictParsing
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    fixedHeight
                    value={editFormData.acquisitionDate}
                  />
                  {errors.acquisitionDate && (
                    <span className="invalid-feedback">
                      {errors.acquisitionDate}
                    </span>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="saleDate">
                    Sale Date
                  </label>
                  <DatePicker
                    id="saleDate"
                    className={
                      errors.saleDate
                        ? "form-control is-invalid mb-2"
                        : "form-control mb-2"
                    }
                    selected={editFormData.saleDate&&editFormData.saleDate!==null?new Date(editFormData.saleDate):null}
                    onChange={(date) => {
                      setEditFormData((data) => ({ ...data, saleDate: date }));
                      setErrors((errors) => ({ ...errors, saleDate: null }));
                    }}
                    isClearable
                    withPortal
                    strictParsing
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    fixedHeight
                    value={editFormData.saleDate}
                  />
                  {errors.saleDate && (
                    <span className="invalid-feedback">{errors.saleDate}</span>
                  )}
                </div>

                <div className="col">
                  <label
                    className="form-label"
                    id="aria-label"
                    htmlFor="assetStatus"
                  >
                    Asset is currently
                  </label>
                  <Select
                    id="assetStatus"
                    ref={selectStatusInputRef}
                    aria-labelledby="aria-label"
                    defaultValue=""
                    components={makeAnimated}
                    options={statusOptions}
                    className={
                      errors.statusCode
                        ? "form-control is-invalid mb-2 p-0"
                        : "mb-2 p-0"
                    }
                    placeholder="Asset is currently ..."
                    isSearchable
                    autoFocus
                    onChange={(event) => {
                      let val = !event ? null : event.value;
                      let label = !event ? null : event.label;

                      setEditFormData((data) => ({ ...data, statusCode: val }));
                      setErrors((errors) => ({ ...errors, statusCode: null }));
                      setStatusSelectFieldValue((data) => ({
                        ...data,
                        label: label,
                        value: val,
                      }));
                    }}
                    noOptionsMessage={() => "No status found"}
                    closeMenuOnSelect={false}
                    isClearable
                    value={
                      statusSelectFieldValue.value !== null
                        ? statusSelectFieldValue
                        : null
                    }
                  />
                  {errors.statusCode && (
                    <span className="invalid-feedback">
                      {errors.statusCode}
                    </span>
                  )}
                </div>
        </div>

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
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Asset Name: </b>
            <span style={{ fontSize: "16px" }}>{asset.assetName}</span>
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Serial Code: </b>
            <span style={{ fontSize: "16px" }}>
              {asset.serialCode ? asset.serialCode : "-"}
            </span>
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Asset Group: </b>
            <span style={{ fontSize: "16px" }}>
              {!asset.assetgroup ? "-" : asset.assetgroup.assetGroupName}
            </span>
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Vendor: </b>
            <span style={{ fontSize: "16px" }}>
              {!asset.vendor || asset.vendor.length === 0
                ? "-"
                : asset.vendor[0].vendorName}
            </span>
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Status: </b>
            <span style={{ fontSize: "16px" }}>
              {!asset.status || asset.status.length === 0
                ? "-"
                : asset.status[0].statusName}
            </span>
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>
              Acquisition Date:{" "}
            </b>
            <span style={{ fontSize: "16px" }}>
              {asset.acquisitionDate ? asset.acquisitionDate.slice(0, 10) : "-"}
            </span>
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>Sale Date: </b>
            <span style={{ fontSize: "16px" }}>
              {asset.saleDate ? asset.saleDate.slice(0, 10) : "-"}
            </span>
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>
              Purchasing Cost:{" "}
            </b>
            <span style={{ fontSize: "16px" }}>
              {asset.purchasingCost ? "$" + asset.purchasingCost : "-"}
            </span>
          </p>
          <p>
            <b style={{ fontSize: "18px", color: "#5F5F5F" }}>
              Current Value:{" "}
            </b>
            <span style={{ fontSize: "16px" }}>
              {asset.currentValue ? "$" + asset.currentValue : "-"}
            </span>
          </p>
        </>

        <>
          <div className="text-center">
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

  let AssetDeleteText = "Are you sure to delete this asset?";
  return (
    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      <div className="card">
        <div className="card-header text-center">
          {inEditMode ? "Edit Form" : asset.assetName}
        </div>
        <div className="card-body">{content}</div>
      </div>
      {modalVisible && (
        <Modal
          content={AssetDeleteText}
          onClickCancel={onClickCancelDelete}
          onClickConfirm={onClickDelete}
          apiProgress={deleteApiProgress}
        />
      )}
    </div>
  );
};

export default AssetProfileCard;
