import { useEffect, useState } from "react";
import { getAssets } from "../api/apiCalls";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

import { AiOutlineSearch } from "react-icons/ai";
import AssetListItem from "./AssetListItem";

const AssetList = () => {
  const auth = useSelector((store) => store);

  const [assetPages, setAssetPages] = useState({
    page: {
      content: [],
      page: 0,
      size: 0,
      totalPages: 0,
      totalAssets: 0,
    },
  });

  const [searchData, setSearchData] = useState("");
  const [doSearch, setDoSearch] = useState(true);

  const [pendingApiCall, setPendingApiCall] = useState(false);

  const loadData = async (pageIndex, size = 5) => {
    setPendingApiCall(true);

    try {
      const response = await getAssets(
        auth.companyId,
        searchData,
        pageIndex,
        size
      );
      setAssetPages((pages) => ({ ...pages, ...{ page: response.data } }));
    } catch (e) {}
    setDoSearch(false);
    setPendingApiCall(false);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted && doSearch) loadData();
    setDoSearch(false);

    return () => (isMounted = false);
  }, [doSearch]);

  const { totalPages, page, content } = assetPages.page;
  let ShowNextButton = page + 1 < totalPages;
  let ShowPreviousButton = page > 0;

  return (
    <div className="container">
      <div className="row ">
        <div className="col p-2">
          {
            <Link className="btn btn-sm btn-primary" to="/addAsset">
              Add New Asset
            </Link>
          }
        </div>
        <div className="col-md-4 ml-auto p-2">
          <div className="input-group mb-3">
            <input
              className="form-control "
              type="search"
              placeholder="Search by asset name"
              aria-label="Search"
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button
              className="btn btn-outline-success "
              type="submit"
              onClick={() => setDoSearch(true)}
            >
              <AiOutlineSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header text-center">
          <h3>Assets ({assetPages.page.totalAssets})</h3>
        </div>
        <table className="table  table-hover">
          <thead>
            <tr>
              <th scope="col">Asset Name</th>
              <th scope="col">Asset Group</th>
              <th scope="col">Serial Code</th>
              <th scope="col">Vendor</th>

              <th scope="col">Purchasing Cost (USD)</th>
              <th scope="col">Current Value (USD)</th>
              <th scope="col">Acquisition Date</th>
              <th scope="col">Sale Date</th>
              <th scope="col">Status</th>

              
            </tr>
          </thead>
          <tbody>
            {content.map((asset) => {
              return <AssetListItem key={asset.id} asset={asset} />;
            })}
          </tbody>
        </table>

        <div className="card-footer text-center">
          {!pendingApiCall && ShowPreviousButton && (
            <button
              className="btn btn-outline-secondary btn-sm float-start"
              onClick={() => loadData(page - 1)}
            >
              {"< previous"}
            </button>
          )}

          {!pendingApiCall && ShowNextButton && (
            <button
              className="btn btn-outline-secondary btn-sm float-end"
              onClick={() => loadData(page + 1)}
            >
              {"next >"}
            </button>
          )}
          {pendingApiCall && <Spinner size="big" />}
        </div>
      </div>
    </div>
  );
};

export default AssetList;
