import { getAssetGroups, getAsssetStatus } from "../api/apiCalls";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";

import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

const AssetStatusReportsPage = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  //DATA
  //*********************************************************************** */
  const auth = useSelector((store) => store);

  const [graphLabels, setGraphLabels] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [borderColor, setBorderColor] = useState([]);

  const randomColorGenerator = () => {
    let random = [];
    for (let i = 0; i < 3; i++) {
      random.push(Math.floor(Math.random() * 256));
    }
    return random;
  };

  const getStatus = async () => {
    try {
      const response = await getAsssetStatus(auth.companyId);
      let statuses = response.data.assetStatuses;
      let labels = [];
      let data = [];
      let backgroundColor = [];
      let borderColor = [];

      statuses.map((status) => {
        labels.push(status.statusName);
        data.push(status.assets.length);
        let generatedColor = randomColorGenerator();

        backgroundColor.push(
          `rgba(${generatedColor[0]},${generatedColor[1]},${generatedColor[2]},0.2)`
        );
        borderColor.push(
          `rgba(${generatedColor[0]},${generatedColor[1]},${generatedColor[2]},1)`
        );
      });
      setGraphLabels(labels);
      setGraphData(data);

      setBackgroundColor(backgroundColor);
      setBorderColor(borderColor);
    } catch (error) {}
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getStatus();
    }
    return () => (isMounted = false);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      // title: {
      //   display: true,
      //   text: "Chart.js Bar Chart",
      // },
    },
  };

  const data2 = {
    labels: graphLabels ? graphLabels : [],
    datasets: [
      {
        label: "Asset Statuses",
        data: graphData ? graphData : [],
        backgroundColor: backgroundColor ? backgroundColor : [],
      },
    ],
  };

  const data = {
    labels: graphLabels ? graphLabels : [],
    datasets: [
      {
        data: graphData ? graphData : [],
        backgroundColor: backgroundColor ? backgroundColor : [],
        borderColor: borderColor ? borderColor : [],
        borderWidth: 1,
      },
    ],
  };

  let showGraph = graphData.find((el) => el !== 0) ? true : false;
  let content = (
    <>
      <p>No asset(s) found</p>
      <Link to="/addAsset" className="btn btn-primary">
        Add Asset
      </Link>
    </>
  );

  return (
    <div className="col-lg-10 offset-lg-1 col-md-8 offset-md-2">
      <div className="card">
        <div className="card-header text-center">Assets by Status</div>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6 col-sm-6">
            {showGraph ? (
              // <div style={{ width: 300, height: 300 }}>
              <div style={{ height: "50vh" }}>
                <Pie
                  data={data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            ) : (
              content
            )}
          </div>

          <div className="col-md-6 col-sm-6">
            {/* <div style={{ width: 500, height: 500 }}> */}
            <div style={{ height: "50vh" }}>
              <Bar options={options} data={data2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetStatusReportsPage;
