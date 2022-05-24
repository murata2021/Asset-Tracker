import { useParams } from "react-router-dom";
import { getAssetGroupById } from "../api/apiCalls";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { useSelector } from "react-redux";
import AssetGroupProfileCard from "../components/AssetGroupProfileCard";

const AssetGroupPage = () => {
  const params = useParams();
  const auth = useSelector((store) => store);

  const [assetGroup, setAssetGroup] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [failedResponse, setFailedResponse] = useState();

  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadAssetGroupById() {
      setPendingApiCall(true);
      try {
        const response = await getAssetGroupById(
          auth.companyId,
          params.assetGroupId
        );
        setAssetGroup((assetGroup) => ({ ...response.data }));
      } catch (error) {
        setFailedResponse({ failResponse: error.response.data.message });
      }
      setPendingApiCall(false);
    }
    if (isMounted && isLoaded) loadAssetGroupById();
    setIsLoaded(false);

    return () => (isMounted = false);
  }, [params.assetGroupId, isLoaded]);

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
        <AssetGroupProfileCard
          assetGroup={assetGroup}
          setIsEditted={setIsLoaded}
        />
      );
    }
  }
  return <div data-testid="assetGroup-page">{content}</div>;
};

export default AssetGroupPage;
