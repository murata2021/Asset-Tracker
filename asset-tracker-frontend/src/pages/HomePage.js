import React from "react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GrUserWorker,
  GrObjectGroup,
  GrDeliver,
  GrDiamond,
} from "react-icons/gr";
import { getCompanyById } from "../api/apiCalls";

const HomePage = () => {
  const auth = useSelector((store) => store);

  const [company, setCompany] = useState();

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        const response = await getCompanyById(auth.companyId);

        setCompany(response.data);
      } catch (error) {}
    };

    loadCompanyData();
  }, []);

  return (
    <>
      <div className="col-lg-10 offset-lg-1 col-md-8 offset-md-2">
        <div className="container ">
          <div className="card">
            <div className="card-header text-center">Dashboard</div>
          </div>
          <div className="card-body homepage-dashboard">
            <div className="row g-3">
              <div className="col-sm-6">
                <div
                  className="card position-relative"
                  style={{ backgroundColor: "#6fdba5" }}
                >
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "white" }}>
                      {company && company.users ? company.users.length : 0}
                    </h5>
                    <p
                      className="text-right position-absolute top-0 end-0 mx-2 d-none d-lg-block"
                      style={{ fontSize: "46px", color: "white" }}
                    >
                      <GrUserWorker />
                    </p>
                    <p className="card-text" style={{ color: "white" }}>
                      Users
                    </p>
                    <Link to="/users" className="btn btn-sm btn-primary">
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div
                  className="card position-relative"
                  style={{ backgroundColor: "lightblue" }}
                >
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "white" }}>
                      {company && company.assetgroups
                        ? company.assetgroups.length
                        : 0}
                    </h5>
                    <p
                      className="text-right position-absolute top-0 end-0 mx-2 d-none d-lg-block"
                      style={{ fontSize: "46px", color: "white" }}
                    >
                      <GrObjectGroup />
                    </p>
                    <p className="card-text" style={{ color: "white" }}>
                      Asset Categories
                    </p>
                    <Link to="/asset-groups" className="btn btn-sm btn-primary">
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-3 mt-3">
              <div className="col-sm-6">
                <div
                  className="card position-relative"
                  style={{ backgroundColor: "#FF9800" }}
                >
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "white" }}>
                      {company && company.assets ? company.assets.length : 0}
                    </h5>
                    <p
                      className="text-right position-absolute top-0 end-0 mx-2 d-none d-lg-block"
                      style={{ fontSize: "46px", color: "white" }}
                    >
                      <GrDiamond />
                    </p>

                    <p className="card-text" style={{ color: "white" }}>
                      Assets
                    </p>
                    <Link to="/assets" className="btn btn-sm btn-primary">
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div
                  className="card position-relative"
                  style={{ backgroundColor: "#EB9694" }}
                >
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "white" }}>
                      {company && company.vendors ? company.vendors.length : 0}
                    </h5>
                    <p
                      className="text-right position-absolute top-0 end-0 mx-2 d-none d-lg-block"
                      style={{ fontSize: "46px", color: "white" }}
                    >
                      <GrDeliver />
                    </p>

                    <p className="card-text" style={{ color: "white" }}>
                      Vendors
                    </p>
                    <Link to="/vendors" className="btn btn-sm btn-primary">
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
