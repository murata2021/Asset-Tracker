import { useEffect, useState } from "react";
import { loadUsers } from "../api/apiCalls";
import { Link } from "react-router-dom";
import UserListItem from "./UserListItem";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

import {AiOutlineSearch} from "react-icons/ai"

const UserList = () => {
  const auth = useSelector((store) => store);

  const [userPages, setUserPages] = useState({
    page: {
      content: [],
      page: 0,
      size: 0,
      totalPages: 0,
      totalUser:0
    },
  });

  const [searchData,setSearchData]=useState("")
  const [doSearch,setDoSearch]=useState(true)


  const [pendingApiCall, setPendingApiCall] = useState(false);

  const loadData = async (pageIndex,size=5) => {
    setPendingApiCall(true);
    
    try {
      const response = await loadUsers( auth.companyId,pageIndex,searchData,size);
      setUserPages((pages) => ({ ...pages, ...{ page: response.data } }));
    } catch (e) {
    }
    setDoSearch(false)
    setPendingApiCall(false);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted && doSearch) loadData();
    setDoSearch(false)

    return () => (isMounted = false);
  }, [doSearch]);

  const { totalPages, page, content } = userPages.page;
  let ShowNextButton = page + 1 < totalPages;
  let ShowPreviousButton = page > 0;

  return (
    <div className="container">
      <div className="row ">
        <div className="col p-2">
        {auth.isAdmin && <Link className="btn btn-sm btn-primary" to="/adduser">
            Add New User
          </Link>}
        </div>
        <div className="col-md-4 ml-auto p-2">
          <div className="input-group mb-3">

            <input
              className="form-control "
              type="search"
              placeholder="Search by username"
              aria-label="Search"
              onChange={(e)=>setSearchData(e.target.value)}
            />
            <button className="btn btn-outline-success " type="submit" onClick={()=>setDoSearch(true)}>
            <AiOutlineSearch/>
            </button>
            </div>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header text-center">
          <h3>Users ({userPages.page.totalUser})</h3>
        </div>
        <table className="table  table-hover">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">E-mail</th>
              <th scope="col">Full Name</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {content.map((user) => {
              return <UserListItem key={user.id} user={user} />;
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

export default UserList;
