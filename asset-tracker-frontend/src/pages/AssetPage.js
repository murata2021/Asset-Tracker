import { useParams } from "react-router-dom";
import { getAssetById,getAssetGroups,getVendors,getAsssetStatus} from "../api/apiCalls";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { useSelector } from "react-redux";
import AssetProfileCard from "../components/AssetProfileCard";

const AssetPage = () => {
  const params = useParams();
  const auth = useSelector((store) => store);

  const [asset, setAsset] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [failedResponse, setFailedResponse] = useState();


  const [statusOptions, setStatusOptions] = useState([]);
  const [vendorOptions, setVendorOptions] = useState([]);
  const [assetGroupOptions, setAssetGroupOptions] = useState([]);

  const [isLoaded, setIsLoaded] = useState(true);

  const loadAssetGroups = async () => {
    try {
      const response = await getAssetGroups(auth.companyId, false);
      setAssetGroupOptions((options) => [
        ...response.data.assetGroups.map((assetGroup) => ({
          value: assetGroup.id,
          label: assetGroup.assetGroupName,
        })),
      ]);
    } catch (error) {}
  };

  const loadVendors = async () => {
    try {
      const response = await getVendors(auth.companyId, false);
      setVendorOptions((options) => [
        ...response.data.vendors.map((vendor) => ({
          value: vendor.id,
          label: vendor.vendorName,
        })),
      ]);
    } catch (error) {}
  };

  const getStatus = async () => {
    try {
      const response = await getAsssetStatus(auth.companyId);
      setStatusOptions((options) => [
        ...response.data.assetStatuses.map((status) => ({
          value: status.id,
          label: status.statusName,
        })),
      ]);
    } catch (error) {}
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getStatus();
      loadVendors()
      loadAssetGroups()
    }
    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadAssetById() {
      setPendingApiCall(true);
      try {
        const response = await getAssetById(
          auth.companyId,
          params.assetId
        );
        setAsset((asset) => ({ ...response.data }));
      } catch (error) {
        setFailedResponse({ failResponse: error.response.data.message });
      }
      setPendingApiCall(false);
    }
    if (isMounted && isLoaded) loadAssetById();
    setIsLoaded(false);

    return () => (isMounted = false);
}, [params.assetId, isLoaded]);


  let content = (
    <Alert type="secondary" center>
      <Spinner size="big" />
    </Alert>
  );

  if (!pendingApiCall) {
    if (failedResponse) {
      content = (
        <Alert type="danger" center>
          {failedResponse.failResponse}
        </Alert>
      );
    } else {
      content = (
        <AssetProfileCard
          asset={asset}
          setIsEditted={setIsLoaded}
          statusOptions={statusOptions}
          vendorOptions={vendorOptions}
          assetGroupOptions={assetGroupOptions}
        />
      );
    }
  }
  return <div data-testid="asset-page">{content}</div>;
};

export default AssetPage;
