import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const VendorListItem = (props) => {
  const { vendor } = props;

  const history = useHistory();
  const handleClick = () => {
    history.push(`/vendors/${vendor.id}`);
  };
 
  return (
    <>
      <tr onClick={handleClick}>
        <td >{vendor.vendorName}</td>
        <td>{vendor.contactPerson}</td>
        <td>{vendor.email}</td>
        {/* <td>{vendor.notes ? vendor.notes : "-"}</td> */}
      </tr>
    </>
  );
};

export default VendorListItem;
