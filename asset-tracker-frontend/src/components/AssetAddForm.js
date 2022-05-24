import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "./Input";
import {
  addAsset,
  getAssetGroups,
  getAsssetStatus,
  getVendors,
  addVendor,
  addAssetGroup,
} from "../api/apiCalls";
import Alert from "./Alert";
import ButtonWithProgress from "./ButtonWithProgress";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Filterable dropdown
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";

import { HiOutlinePlus, HiPlusSm } from "react-icons/hi";

//Calendar/Date fields
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Currency Fields
import CurrencyInput from "react-currency-input-field";

const AssetAddForm = () => {
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
  const auth = useSelector((store) => store);

  const [statusOptions, setStatusOptions] = useState([]);
  const [vendorOptions, setVendorOptions] = useState([]);
  const [assetGroupOptions, setAssetGroupOptions] = useState([]);

  const [apiProgress, setApiProgress] = useState(false);
  const [assetCreationSuccess, setAssetCreationSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [inVendorCreateMode, setVendorCreateMode] = useState(false);
  const [inAssetGroupCreateMode, setAssetGroupCreateMode] = useState(false);

  const [creationApiProgress, setCreationApiProgress] = useState(false);

  //ASSET CREATION FORM DATA
  //********************************************* */
  const ASSET_FORM_INITIAL_STATE = {
    assetName: "",
    serialCode: "",
    assetgroupId: null,
    vendorId: null,
    statusCode: null,
    acquisitionDate: null,
    saleDate: null,
    purchasingCost: null,
    currentValue: null,
  };
  const [formData, setFormData] = useState(ASSET_FORM_INITIAL_STATE);
  //********************************************* */


/*SELECT FIELDS STATE CONTROL*/ 
  const SELECT_FIELDS_INITIAL_STATE={
    value: null,
    label: null,
  }
  const [assetGroupSelectFieldValue, setAssetGroupSelectFieldValue] = useState(SELECT_FIELDS_INITIAL_STATE);
  const [vendorSelectFieldValue, setVendorSelectFieldValue] = useState(SELECT_FIELDS_INITIAL_STATE);
  const [statusSelectFieldValue, setStatusSelectFieldValue] = useState(SELECT_FIELDS_INITIAL_STATE);
/*********************************/ 

  //CREATE NEW VENDOR FORM DATA
  //********************************************* */
  const VENDOR_FORM_INITIAL_STATE = {
    vendorName: "",
    contactPerson: "",
    email: "",
    notes: "",
  };

  const [vendorFormData, setVendorFormData] = useState(
    VENDOR_FORM_INITIAL_STATE
  );
  //********************************************* */

//CREATE NEW ASSET GROUP FORM DATA
  //********************************************* */
  const ASSET_GROUP_FORM_INITIAL_STATE = { assetGroupName: "" };

  const [assetGroupFormData, setAssetGroupFormData] = useState(
    ASSET_GROUP_FORM_INITIAL_STATE
  );
  //********************************************* */

  //ADD NEW VENDOR AND ASSET GROUP
  //********************************************* */
  const onClickSave = async (formName) => {
    setCreationApiProgress(true);
    try {
      if (formName === "assetGroup") {
        setAssetGroupCreateMode(false);
      } else if (formName === "vendor") {
        setVendorCreateMode(false);
      }
      setErrors({});
    } catch (error) {}
    setCreationApiProgress(false);
  };

  const onClickCancel = (formName) => {
    if (formName === "assetGroup") {
      setAssetGroupCreateMode(false);
      setAssetGroupFormData(ASSET_GROUP_FORM_INITIAL_STATE);
    } else if (formName === "vendor") {
      setVendorCreateMode(false);
      setVendorFormData(VENDOR_FORM_INITIAL_STATE);
    }
    setErrors({});
  };
  //********************************************* */

  const handleChange = (e) => {
    


    const { id, value } = e.target;
    setAssetCreationSuccess(false);
    setFormData((data) => ({ ...data, [id]: value }));
    setErrors((errors) => ({ ...errors, [id]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    try {
      //API CALL
      const response = await addAsset(formData, auth.companyId);
      setAssetCreationSuccess(true);
      setFormData(ASSET_FORM_INITIAL_STATE);

      setAssetGroupSelectFieldValue(SELECT_FIELDS_INITIAL_STATE)
      setVendorSelectFieldValue(SELECT_FIELDS_INITIAL_STATE)
      setStatusSelectFieldValue(SELECT_FIELDS_INITIAL_STATE)

      clearSelected();
    } catch (e) {
      if (e.response.status === 400) {
        setErrors((data) => ({ ...e.response.data.validationErrors }));
        setApiProgress(false);
      }
    }
    setApiProgress(false);
  };

  const handleVendorFormChange = (e) => {
    const { id, value } = e.target;
    setVendorFormData((data) => ({ ...data, [id]: value }));
    setErrors((errors) => ({ ...errors, [id]: null }));
  };

  const handleVendorFormSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    try {
      //API CALL
      const response = await addVendor(vendorFormData, auth.companyId);
      onClickSave("vendor");
      setVendorFormData(VENDOR_FORM_INITIAL_STATE);
    } catch (e) {
      if (e.response.status === 400) {
        setErrors((data) => ({ ...e.response.data.validationErrors }));
        setApiProgress(false);
      }
    }
    setApiProgress(false);
    return;
  };

  const handleAssetGroupFormChange = (e) => {
    const { id, value } = e.target;
    setAssetGroupFormData((data) => ({ ...data, [id]: value }));
    setErrors((errors) => ({ ...errors, [id]: null }));
  };

  const handleAssetGroupFormSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    try {
      //API CALL
      const response = await addAssetGroup(assetGroupFormData, auth.companyId);
      onClickSave("assetGroup");
      setAssetGroupFormData(ASSET_GROUP_FORM_INITIAL_STATE);
    } catch (e) {
      if (e.response.status === 400) {
        setErrors((data) => ({ ...e.response.data.validationErrors }));
        setApiProgress(false);
      }
    }
    setApiProgress(false);
    return;
  };

  const loadAssetGroups = async () => {
    try {
      const response = await getAssetGroups(auth.companyId, false);
      setAssetGroupOptions((options) => [
        ...response.data.assetGroups.map((assetGroup) => ({
          value: assetGroup.id,
          label: assetGroup.assetGroupName,
        })),
      ]);
    } catch (error) {}
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) loadAssetGroups();
    return () => (isMounted = false);
  }, [formData.assetGroupId, inAssetGroupCreateMode]);

  const loadVendors = async () => {
    try {
      const response = await getVendors(auth.companyId, false);
      setVendorOptions((options) => [
        ...response.data.vendors.map((vendor) => ({
          value: vendor.id,
          label: vendor.vendorName,
        })),
      ]);
    } catch (error) {}
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) loadVendors();

    return () => (isMounted = false);
  }, [formData.vendorId, inVendorCreateMode]);

  const getStatus = async () => {
    try {
      const response = await getAsssetStatus(auth.companyId);
      setStatusOptions((options) => [
        ...response.data.assetStatuses.map((status) => ({
          value: status.id,
          label: status.statusName,
        })),
      ]);
    } catch (error) {}
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getStatus();
    }
    return () => (isMounted = false);
  }, []);

  let content;
  if (inVendorCreateMode) {
    content = (
      <>
        <Input
          id="vendorName"
          label="Vendor Name"
          onChange={handleVendorFormChange}
          help={errors.vendorName}
          value={vendorFormData.vendorName}
        />
        <Input
          id="contactPerson"
          label="Contact Person"
          onChange={handleVendorFormChange}
          help={errors.contactPerson}
          value={vendorFormData.contactPerson}
        />
        <Input
          id="email"
          label="E-mail"
          onChange={handleVendorFormChange}
          help={errors.email}
          value={vendorFormData.email}
        />
        <Input
          id="notes"
          label="Notes"
          onChange={handleVendorFormChange}
          help={errors.notes}
          value={vendorFormData.notes}
        />

        <ButtonWithProgress
          onClick={handleVendorFormSubmit}
          apiProgress={creationApiProgress}
        >
          Create Vendor
        </ButtonWithProgress>
        <button
          onClick={() => onClickCancel("vendor")}
          className="btn btn-outline-secondary"
        >
          Cancel
        </button>
      </>
    );
  } else if (inAssetGroupCreateMode) {
    content = (
      <>
        <Input
          onChange={handleAssetGroupFormChange}
          initialValue={assetGroupFormData.assetGroupName}
          id="assetGroupName"
          label="Asset Group Name"
          help={errors.assetGroupName}
        />

        <ButtonWithProgress
          onClick={handleAssetGroupFormSubmit}
          apiProgress={creationApiProgress}
        >
          Create Asset Group
        </ButtonWithProgress>
        <button
          onClick={() => onClickCancel("assetGroup")}
          className="btn btn-outline-secondary"
        >
          Cancel
        </button>
      </>
    );
  } else {
    content = (
      <>
        <div
          className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
          data-testid="add-asset-page"
        >
          <form className="card" data-testid="form-add-user">
            <div className="card-header">
              <h1 className="text-center">Add New Asset</h1>
            </div>
            <div className="card-body">
              {assetCreationSuccess && (
                <Alert>Asset created successfully</Alert>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <Input
                    id="assetName"
                    label="Asset Name"
                    onChange={handleChange}
                    help={errors.assetName}
                    value={formData.assetName}
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    id="serialCode"
                    label="Serial Code"
                    onChange={handleChange}
                    help={errors.serialCode}
                    value={formData.serialCode}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className="form-label"
                    id="aria-label"
                    htmlFor="assetGroup"
                  >
                    Asset Group
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
                        setFormData((data) => ({ ...data, assetgroupId: val }));
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

                    <button
                      className="btn btn-sm btn-outline-success"
                      type="button"
                      id="button-addon1"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Create New Asset Group"
                      onClick={() => setAssetGroupCreateMode(true)}
                    >
                      <HiOutlinePlus />
                    </button>
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
                    Vendor
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

                        setFormData((data) => ({ ...data, vendorId: val }));
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

                    <button
                      className="btn btn-sm btn-outline-success"
                      type="button"
                      id="button-addon2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Create New Vendor "
                      onClick={() => setVendorCreateMode(true)}
                    >
                      <HiOutlinePlus />
                    </button>
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

                  {!apiProgress&&<CurrencyInput
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
                      setFormData((data) => ({
                        ...data,
                        purchasingCost: value,
                      }));
                      setErrors((errors) => ({
                        ...errors,
                        purchasingCost: null,
                      }));
                    }}
                    value={formData.purchasingCost}                    
                  />}


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

                  {!apiProgress&&<CurrencyInput
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
                      setFormData((data) => ({ ...data, currentValue: value }));
                      setErrors((errors) => ({
                        ...errors,
                        currentValue: null,
                      }));
                    }}
                    value={formData.currentValue}
                  />}
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
                    selected={formData.acquisitionDate}
                    onChange={(date) => {
                      setFormData((data) => ({
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
                    value={formData.acquisitionDate}
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
                    selected={formData.saleDate}
                    onChange={(date) => {
                      setFormData((data) => ({ ...data, saleDate: date }));
                      setErrors((errors) => ({ ...errors, saleDate: null }));
                    }}
                    isClearable
                    withPortal
                    strictParsing
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    fixedHeight
                    value={formData.saleDate}
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
                    Asset is currently{" "}
                  </label>
                  <Select
                    id="assetStatus"
                    ref={selectStatusInputRef}
                    aria-labelledby="aria-label"
                    defaultValue=""
                    components={makeAnimated()}
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

                      setFormData((data) => ({ ...data, statusCode: val }));
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
                  apiProgress={apiProgress}
                  onClick={handleSubmit}
                >
                  Create Asset
                </ButtonWithProgress>
                <span
                  className="divider"
                  style={{
                    width: "5px",
                    height: "auto",
                    display: "inline-block",
                  }}
                ></span>
                <Link className="btn btn-secondary" to="/assets">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }

  return <>{content}</>;
};

export default AssetAddForm;
