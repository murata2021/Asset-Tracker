import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const AssetListItem = (props) => {
  const { asset } = props;

  const history = useHistory();
  const handleClick = () => {
    history.push(`/assets/${asset.id}`);
  };



  return (
    <>
      <tr onClick={handleClick}>
        <td>{asset.assetName}</td>
        <td>{asset.assetgroup.assetGroupName}</td>
        <td>{asset.serialCode?asset.serialCode:"-"}</td>
        <td>{asset.vendor[0]?asset.vendor[0].vendorName:"-"}</td>

        <td>{asset.purchasingCost ? asset.purchasingCost : "-"}</td>
        <td>{asset.currentValue ? asset.currentValue : "-"}</td>

        <td>{asset.acquisitionDate ? asset.acquisitionDate.slice(0,10) : "-"}</td>
        <td>{asset.saleDate ? asset.saleDate.slice(0,10) : "-"}</td>
        <td>{asset.status[0]?asset.status[0].statusName:"-"}</td>

      </tr>
    </>
  );
};

export default AssetListItem;
