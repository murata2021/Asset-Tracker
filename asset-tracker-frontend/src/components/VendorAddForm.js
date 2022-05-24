import { useState } from "react";
import Input from "./Input";
import {  addVendor } from "../api/apiCalls";
import Alert from "./Alert";
import ButtonWithProgress from "./ButtonWithProgress";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AddVendorForm = () => {
  const INITIAL_FORM_STATE = {
    vendorName: "",
    email:"",
    contactPerson: "",
    notes: "",
  };
  const auth = useSelector((store) => store);

  const [apiProgress, setApiProgress] = useState(false);
  const [vendorCreationSuccess, setVendorCreationSuccess] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((data) => ({ ...data, [id]: value }));
    setErrors((errors) => ({ ...errors, [id]: null }));
    setVendorCreationSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { vendorName, contactPerson,email, notes } = formData;

    const body = {
      vendorName,
      contactPerson,
      email,
      notes,
    };
    setApiProgress(true);
    try {
      //API CALL
      const response = await addVendor(body, auth.companyId);
      setVendorCreationSuccess(true);
      setFormData(INITIAL_FORM_STATE);
    } catch (e) {
      if (e.response.status === 400) {
        setErrors((data) => ({ ...e.response.data.validationErrors }));
        setApiProgress(false);
      }
      setVendorCreationSuccess(false);
    }
    setApiProgress(false);
  };

  return (
    <div
      className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
      data-testid="addVendor-page"
    >
      <form className="card" data-testid="form-add-vendor">
        <div className="card-header">
          <h1 className="text-center">Add Vendor</h1>
        </div>
        <div className="card-body">
          {vendorCreationSuccess && <Alert>Vendor created successfully</Alert>}
          <Input
            id="vendorName"
            label="Vendor Name"
            onChange={handleChange}
            help={errors.vendorName}
            value={formData.vendorName}
          />
          <Input
            id="contactPerson"
            label="Contact Person"
            onChange={handleChange}
            help={errors.contactPerson}
            value={formData.contactPerson}
          />
          <Input
            id="email"
            label="E-mail"
            onChange={handleChange}
            help={errors.email}
            value={formData.email}
          />
          <Input
            id="notes"
            label="Notes"
            onChange={handleChange}
            help={errors.notes}
            value={formData.notes}
          />

          <div className="text-center">
            <ButtonWithProgress
              apiProgress={apiProgress}
              onClick={handleSubmit}
            >
              Add Vendor
            </ButtonWithProgress>
            <span
              className="divider"
              style={{ width: "5px", height: "auto", display: "inline-block" }}
            ></span>
            <Link className="btn btn-secondary" to="/vendors">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddVendorForm;
