import { FaRobot } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const AssetGroupListItem = (props) => {
  const { assetGroup } = props;

  const history = useHistory();
  const handleClick = () => {
    history.push(`/asset-groups/${assetGroup.id}`);
  };

  return (
    <>
      <tr onClick={handleClick}>
        <td>{assetGroup.assetGroupName} ({assetGroup.assets.length})</td>
      </tr>
    </>
  );
};

export default AssetGroupListItem;
