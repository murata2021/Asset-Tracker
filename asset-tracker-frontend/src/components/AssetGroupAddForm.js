

import { useState } from "react";
import Input from "./Input";
import {  addAssetGroup } from "../api/apiCalls";
import Alert from "./Alert";
import ButtonWithProgress from "./ButtonWithProgress";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";




const AssetGroupAddForm=()=>{

    const INITIAL_FORM_STATE = {
            assetGroupName:""
          };
          const auth = useSelector((store) => store);
        
          const [apiProgress, setApiProgress] = useState(false);
          const [assetGroupCreationSuccess, setAssetGroupCreationSuccess] = useState(false);
          const [formData, setFormData] = useState(INITIAL_FORM_STATE);
          const [errors, setErrors] = useState({});
        
          const handleChange = (e) => {
            const { id, value } = e.target;
            setFormData((data) => ({ ...data, [id]: value }));
            setErrors((errors) => ({ ...errors, [id]: null }));
            setAssetGroupCreationSuccess(false);
          };
        
          const handleSubmit = async (e) => {
            e.preventDefault();
        
            const { assetGroupName } = formData;
        
            const body = {
              assetGroupName
            };
            setApiProgress(true);
            try {
              //API CALL
              const response = await addAssetGroup(body, auth.companyId);
              setAssetGroupCreationSuccess(true);
              setFormData(INITIAL_FORM_STATE);
            } catch (e) {
              if (e.response.status === 400) {
                setErrors((data) => ({ ...e.response.data.validationErrors }));
                setApiProgress(false);
              }
              setAssetGroupCreationSuccess(false);
            }
            setApiProgress(false);
          };
        
          return (
            <div
              className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
              data-testid="addAssetGroup-page"
            >
              <form className="card" data-testid="form-add-asset-groups">
                <div className="card-header">
                  <h1 className="text-center">Add Aseet Group</h1>
                </div>
                <div className="card-body">
                  {assetGroupCreationSuccess && <Alert>Asset Group created successfully</Alert>}
                  <Input
                    id="assetGroupName"
                    label="Asset Group Name"
                    onChange={handleChange}
                    help={errors.assetGroupName}
                    value={formData.assetGroupName}
                  />
        
                  <div className="text-center">
                    <ButtonWithProgress
                      apiProgress={apiProgress}
                      onClick={handleSubmit}
                    >
                      Add Group
                    </ButtonWithProgress>
                    <span
                      className="divider"
                      style={{ width: "5px", height: "auto", display: "inline-block" }}
                    ></span>
                    <Link className="btn btn-secondary" to="/asset-groups">
                      Cancel
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          );
}

export default AssetGroupAddForm