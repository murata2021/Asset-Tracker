import { useEffect, useState } from "react";
import { getAsssetStatus, getVendors } from "../api/apiCalls";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

import { AiOutlineSearch } from "react-icons/ai";
import VendorListItem from "./VendorListItem";
import { FaRunning, FaTrash } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { MdHomeRepairService, MdStore } from "react-icons/md";

const StatusList = () => {
  const auth = useSelector((store) => store);

  const [statusOptions, setStatusOptions] = useState();
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const getStatus = async () => {
    setPendingApiCall(true);

    try {
      const response = await getAsssetStatus(auth.companyId);
      setStatusOptions(response.data.assetStatuses);
    } catch (error) {
      setPendingApiCall(false);
    }
    setPendingApiCall(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getStatus();
    }
    return () => (isMounted = false);
  }, []);

  let content;

  return (
    <>
      <div className="col-lg-10 offset-lg-1 col-md-8 offset-md-2">
        <div className="container-fluid ">
          <div className="card">
            <div className="card-header text-center">Asset Statuses</div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 m-0 align-items-center justify-content-center d-flex">
        {statusOptions && (
          <div className="row mt-4 w-100 p-0 w-0">
            <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
              <div
                className="card mx-auto"
                style={{ width: "18rem", backgroundColor: "#E00328" }}
              >
                <div className="card-img-top text-center mt-3">
                  <FaTrash size={100} />
                </div>
                <div className="card-body">
                  <Link to={`/asset-statuses/${statusOptions[0].id}/assets`}>
                    <p className="card-text text-center" style={{ color: "white" }}>
                      {statusOptions[0].statusName} (
                      {statusOptions[0].assets.length})
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
              <div
                className="card mx-auto"
                style={{ width: "18rem", backgroundColor: "#E0DD03" }}
              >
                <div className="card-img-top text-center mt-3">
                  <GiSandsOfTime size={100} />
                </div>
                <div className="card-body">
                  <Link to={`/asset-statuses/${statusOptions[1].id}/assets`}>
                    <p
                      className="card-text text-center "
                      style={{ color: "white" }}
                    >
                      {statusOptions[1].statusName} (
                      {statusOptions[1].assets.length})
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
              <div
                className="card mx-auto"
                style={{ width: "18rem", backgroundColor: "#AE03E0" }}
              >
                <div className="card-img-top text-center mt-3">
                  <MdHomeRepairService size={100} />
                </div>
                <div className="card-body">
                  <Link to={`/asset-statuses/${statusOptions[2].id}/assets`}>
                    <p className="card-text text-center" style={{ color: "white" }}>
                      {statusOptions[2].statusName} (
                      {statusOptions[2].assets.length})
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
              <div
                className="card mx-auto"
                style={{ width: "18rem", backgroundColor: "#03CEE0" }}
              >
                <div className="card-img-top text-center mt-3">
                  <MdStore size={100} />
                </div>
                <div className="card-body">
                  <Link to={`/asset-statuses/${statusOptions[3].id}/assets`}>
                    <p className="card-text text-center" style={{ color: "white" }}>
                      {statusOptions[3].statusName} (
                      {statusOptions[3].assets.length})
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
              <div
                className="card mx-auto"
                style={{ width: "18rem", backgroundColor: "#03E01B" }}
              >
                <div className="card-img-top text-center mt-3">
                  <FaRunning size={100} />
                </div>
                <div className="card-body">
                  <Link to={`/asset-statuses/${statusOptions[4].id}/assets`}>
                    <p className="card-text text-center" style={{ color: "white" }}>
                      {statusOptions[4].statusName} (
                      {statusOptions[4].assets.length})
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StatusList;
