import React from "react";
import { Route } from "react-router-dom";

import "./App.css";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CompanyPage from "./pages/CompanyPage";
import AddUserForm from "./components/UserAddForm";
import UserList from "./components/UserList";
import AddNewAsset from "./components/AssetAddForm";
import { useSelector } from "react-redux";
import PublicHomePage from "./pages/PublicHomePage";

import NavBar from "./components/NavBar";
import { Redirect, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import VendorList from "./components/VendorList";

import AddVendorForm from "./components/VendorAddForm";
import VendorPage from "./pages/VendorPage";
import AssetGroupPage from "./pages/AssetGroupPage";
import AssetGroupList from "./components/AssetGroupList";
import AssetGroupAddForm from "./components/AssetGroupAddForm";
import AssetList from "./components/AssetList";
import AssetPage from "./pages/AssetPage";
import AssetGroupReportsPage from "./pages/AssetGroupReportsPage";
import AssetStatusReportsPage from "./pages/AssetStatusReport";
import AssetVendorReportsPage from "./pages/AssetVendorReport";
import AssetGroupAssetListing from "./components/AssetGroupAssetListing";
import VendorAssetListing from "./components/VendorAssetListing";
import StatusList from "./components/StatusList";
import StatusAssetListing from "./components/StatusAssetListing";

function App() {
  const auth = useSelector((store) => store);

  return (
    <div>
      <NavBar>
        <div className="container pt-3">
          <Switch>
            <Route exact path="/">
              {!auth.isLoggedIn ? <PublicHomePage /> : <HomePage />}
            </Route>

            {/* Auth Routes */}
            <Route exact path="/signup">
              {!auth.isLoggedIn ? <SignUpPage /> : <Redirect exact to="/" />}
            </Route>
            <Route exact path="/login">
              {!auth.isLoggedIn ? <LoginPage /> : <Redirect exact to="/" />}
            </Route>

            {/* Company Routes */}

            <Route exact path="/company">
              {auth.isLoggedIn ? <CompanyPage /> : <Redirect exact to="/" />}
            </Route>

            {/* User Routes */}

            <Route exact path="/users">
              {auth.isLoggedIn ? <UserList /> : <Redirect exact to="/" />}
            </Route>
            <Route exact path="/users/:userId">
              {auth.isLoggedIn ? <UserPage /> : <Redirect exact to="/" />}
            </Route>

            <Route exact path="/addUser">
              {auth.isLoggedIn && auth.isAdmin ? (
                <AddUserForm />
              ) : (
                <Redirect exact to="/" />
              )}
            </Route>

            {/* Vendor Routes */}

            <Route exact path="/vendors">
              {auth.isLoggedIn ? <VendorList /> : <Redirect exact to="/" />}
            </Route>

            <Route exact path="/vendors/:vendorId">
              {auth.isLoggedIn ? <VendorPage /> : <Redirect exact to="/" />}
            </Route>

            <Route exact path="/addVendor">
              {auth.isLoggedIn ? <AddVendorForm /> : <Redirect exact to="/" />}
            </Route>

            <Route exact path="/vendors/:vendorId/assets">
              {auth.isLoggedIn ? (
                <VendorAssetListing />
              ) : (
                <Redirect exact to="/" />
              )}
            </Route>

            {/* Asset Group Routes */}

            <Route exact path="/asset-groups">
              {auth.isLoggedIn ? <AssetGroupList /> : <Redirect exact to="/" />}
            </Route>

            <Route exact path="/asset-groups/:assetGroupId">
              {auth.isLoggedIn ? <AssetGroupPage /> : <Redirect exact to="/" />}
            </Route>

            <Route exact path="/asset-groups/:assetGroupId/assets">
              {auth.isLoggedIn ? (
                <AssetGroupAssetListing />
              ) : (
                <Redirect exact to="/" />
              )}
            </Route>

            <Route exact path="/addAssetGroup">
              {auth.isLoggedIn ? (
                <AssetGroupAddForm />
              ) : (
                <Redirect exact to="/" />
              )}
            </Route>

            {/* Asset Routes */}
            <Route exact path="/assets">
              {auth.isLoggedIn ? <AssetList /> : <Redirect exact to="/" />}
            </Route>

            <Route exact path="/assets/:assetId">
              {auth.isLoggedIn ? <AssetPage /> : <Redirect exact to="/" />}
            </Route>

            <Route exact path="/addAsset">
              {auth.isLoggedIn ? <AddNewAsset /> : <Redirect exact to="/" />}
            </Route>

            {/* Asset Status Routes */}

            <Route exact path="/asset-statuses">
              {auth.isLoggedIn ? <StatusList /> : <Redirect exact to="/" />}
            </Route>

            <Route exact path="/asset-statuses/:statusId/assets">
              {auth.isLoggedIn ? (
                <StatusAssetListing />
              ) : (
                <Redirect exact to="/" />
              )}
            </Route>

            {/* Reports */}

            <Route exact path="/reports/asset-groups">
              {auth.isLoggedIn ? (
                <AssetGroupReportsPage />
              ) : (
                <Redirect exact to="/" />
              )}
            </Route>

            <Route exact path="/reports/asset-status">
              {auth.isLoggedIn ? (
                <AssetStatusReportsPage />
              ) : (
                <Redirect exact to="/" />
              )}
            </Route>
            <Route exact path="/reports/asset-vendors">
              {auth.isLoggedIn ? (
                <AssetVendorReportsPage />
              ) : (
                <Redirect exact to="/" />
              )}
            </Route>

            <Redirect to="/" />
          </Switch>
        </div>
      </NavBar>
    </div>
  );
}

export default App;
