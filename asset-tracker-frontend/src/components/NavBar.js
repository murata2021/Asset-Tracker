import { FaRobot } from "react-icons/fa";
import { RiLogoutBoxRLine, RiSettings4Line } from "react-icons/ri";
import { HiUser } from "react-icons/hi";

import React from "react";
import { Link } from "react-router-dom";
import storage from "../state/storage";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logoutSuccess } from "../state/authActions";
import "../App.css";

const NavBarV2 = (props) => {
  const history = useHistory();
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();

  const onClickLogout = async (event) => {
    event.preventDefault();
    dispatch(logoutSuccess());
    storage.clear();
    history.push("/");
  };

  let sideBarButtonClass = auth.isLoggedIn
    ? "btn btn-info"
    : "btn btn-info invisible";

  return (
    <div>
      <div className="wrapper">
        {auth.isLoggedIn && (
          <nav id="sidebar">
            <div className="sidebar-header">
              <p
                style={{
                  color: "white",
                  fontFamily: "system-ui",
                  fontSize: "32px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <FaRobot size="2em" />
              </p>
            </div>

            <ul className="list-unstyled components">
              <p
                style={{
                  color: "white",
                  fontFamily: "system-ui",
                  fontSize: "32px",
                }}
              >
                Asset Tracker
              </p>

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <a
                  className="dropdown-toggle"
                  data-bs-toggle="collapse"
                  href="#assetsCollapse"
                  aria-expanded="false"
                  aria-controls="assetsCollapse"
                >
                  Assets
                </a>
                <ul className="collapse list-unstyled" id="assetsCollapse">
                  <li>
                    <Link to="/assets">Assets</Link>
                  </li>
                  <li>
                    <Link to="/asset-groups">Asset Groups</Link>
                  </li>
                  <li>
                    <Link to="/asset-statuses">Asset Statuses</Link>
                  </li>
                </ul>
                <li>
                  <Link to="/company">Company</Link>
                </li>
              </li>
              <li>
                <a
                  className="dropdown-toggle"
                  data-bs-toggle="collapse"
                  href="#assetsCollapse1"
                  aria-expanded="false"
                  aria-controls="assetsCollapse1"
                >
                  Reports
                </a>
                <ul className="collapse list-unstyled" id="assetsCollapse1">
                  <li>
                    <Link to="/reports/asset-groups">Asset Group Reports</Link>
                  </li>
                  <li>
                    <Link to="/reports/asset-status">Status Reports</Link>
                  </li>
                  <li>
                    <Link to="/reports/asset-vendors">Vendor Reports</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/vendors">Vendors</Link>
              </li>
            </ul>

            <ul className="list-unstyled CTAs">
              <li>
                <Link className="download" to={`/users/${auth.userId}`}>
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="nav-link article" onClick={onClickLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              {!auth.isLoggedIn && (
                <Link className="navbar-brand" to="/" title="Home">
                  <p
                    style={{
                      color: "#325ea8",
                      fontFamily: "system-ui",
                      fontSize: "40px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaRobot size="1.5em" style={{ marginRight: "20px" }} />
                    Asset Tracker
                  </p>
                </Link>
              )}
              <button
                type="button"
                id="sidebarCollapse"
                className={sideBarButtonClass}
              >
                <i className="fas fa-align-left"></i>
                <span></span>
              </button>
              <div
                style={{
                  width: "25px",
                  height: "auto",
                  display: "inline-block",
                }}
              ></div>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                {auth.isLoggedIn && (
                  <Link className="nav navbar-nav" to="/" title="Home">
                    <p
                      style={{
                        color: "#325ea8",
                        fontFamily: "system-ui",
                        fontSize: "40px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <FaRobot size="1em" style={{ marginRight: "10px" }} />
                      Asset Tracker
                    </p>
                  </Link>
                )}
                <ul className="nav navbar-nav ms-auto">
                  {!auth.isLoggedIn ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/login" title="Login">
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link "
                          to="/signup"
                          title="Sign Up"
                        >
                          Sign Up
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to={`/users/${auth.userId}`}>
                          <HiUser size="1.5em" />
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" onClick={onClickLogout}>
                          <RiLogoutBoxRLine size="1.5em" />
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>

          {props.children}
        </div>
      </div>
    </div>
  );
};

export default NavBarV2;
