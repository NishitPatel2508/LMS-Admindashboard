import { Pie, ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsivePieCanvas } from "@nivo/pie";

// import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
ChartJS.register(Tooltip, Legend, ArcElement);
const DonutChart = () => {
  const [finalArray1, setFinalArray1] = useState([]);
  const finalArray = [];
  const pieArray = [];
  const options = {};
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const colorOfFields = [
    "hsl(340, 70%, 50%)",
    "hsl(86, 70%, 50%)",
    "hsl(291, 70%, 50%)",
    "hsl(229, 70%, 50%)",
    "hsl(344, 70%, 50%)",
  ];

  const [allData, setAllData] = useState([]);
  let i = 0;
  useEffect(() => {
    getAllRevenue();
  }, []);
  const courseNames = [];
  let cnt = 0;
  const getAllRevenue = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const result = await axios
        .get(`http://localhost:5000/getAllRevenue`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response) {
            if (response.data) {
              setAllData(response.data.data);
              console.log(response.data.data);
              console.log("all", allData);
              response.data.data.map((e) => {
                i += e.courseAmount;
                // console.log(e.courseAmount, e.courseInfo.name);
              });
              response.data.data.map((e) => {
                if (courseNames.includes(e.courseInfo) == false) {
                  cnt++;
                  courseNames.push(e.courseInfo);
                  const finalData = {};
                  // finalData.name = e.courseInfo;
                  finalData.id = e.courseInfo;
                  finalData.label = e.courseInfo;
                  finalData.value = 0;
                  finalData.value += e.courseAmount;
                  finalData.color = colorOfFields[cnt];
                  finalArray.push(finalData);
                } else {
                  for (const i of finalArray) {
                    if (i.label == e.courseInfo) {
                      i.value += e.courseAmount;
                      console.log(typeof i.value);
                    }
                  }
                }
                setFinalArray1(finalArray);
              });
            }
            // viewChart();
            // console.log(courseNames);
            // console.log(finalArray1, "11111");
            // pieArray.push(finalArray);
            // console.log(pieArray);
            // console.log(pieChartData);
          }
        })
        .catch((err) => {
          // toast.error(err.response.data.message);
          console.log(err.response.data);
          // setError(err.response.data.message);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
      {/* <div
        style={{
          height: "350px",
          width: "800px",
          // border: "1px solid black",
        }}
      >
        <ResponsivePieCanvas
          data={finalArray1}
          margin={{ top: 60, right: 200, bottom: 40, left: 90 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "paired" }}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.6]],
          }}
          arcLinkLabelsSkipAngle={8}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="#333333"
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 10,
              translateY: 35,
              itemsSpacing: 10,
              itemWidth: 180,
              itemHeight: 18,
              itemTextColor: "black",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 14,
              symbolShape: "circle",
            },
          ]}
        />
      </div> */}

      {/* <h1>{pieChartData}</h1> */}
      <ResponsivePie
        data={finalArray1}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        colors={{ scheme: "paired" }}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={7}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 1.5]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 10,
            translateY: 35,
            itemsSpacing: 10,
            itemWidth: 180,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 14,
            symbolShape: "circle",
          },
        ]}
      />
    </>
  );
};

export default DonutChart;
