import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [finalArray1, setFinalArray1] = useState([]);
  const finalArray = [];
  const [allData, setAllData] = useState([]);
  let i = 0;
  const colorOfFields = [
    "hsl(340, 70%, 50%)",
    "hsl(86, 70%, 50%)",
    "hsl(291, 70%, 50%)",
    "hsl(229, 70%, 50%)",
    "hsl(344, 70%, 50%)",
  ];
  //   January: 0,
  //   February: 0,
  //   March: 0,
  //   April: 0,
  //   May: 0,
  //   June: 0,
  //   July: 0,
  //   August: 0,
  //   September: 0,
  //   October: 0,
  //   November: 0,
  //   December: 0,
  // };
  useEffect(() => {
    getAllRevenue();
  }, []);
  const courseNames = [];
  const months = [];
  const m = [];
  let n = [];
  let BarArray = [];
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
                if (courseNames.includes(e.courseInfo.name) == false) {
                  cnt++;
                  courseNames.push(e.courseInfo.name);
                  const finalData = {};
                  const xy = moment(e.buyDate).format("MMMM");
                  // finalData.name = e.courseInfo.name;
                  finalData.id = e.courseInfo.name;
                  finalData.label = e.courseInfo.name;
                  finalData.value = 0;
                  finalData.value += e.courseAmount;
                  finalData.color = colorOfFields[cnt];
                  finalData[xy] = finalData.value;
                  // const x = moment(e.buyDate).format("MMMM");
                  // m.push(x);
                  finalArray.push(finalData);
                } else {
                  for (const i of finalArray) {
                    if (i.label == e.courseInfo.name) {
                      i.value += e.courseAmount;
                      if (
                        i[moment(e.buyDate).format("MMMM")] ==
                        finalArray[moment(e.buyDate).format("MMMM")]
                      ) {
                        i[moment(e.buyDate).format("MMMM")] = e.courseAmount;
                      } else {
                        i[moment(e.buyDate).format("MMMM")] += e.courseAmount;
                      }

                      console.log(typeof i.value);
                    }
                  }
                }
                setFinalArray1(finalArray);
              });
            }
            console.log(finalArray);
            // console.log(m);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return (
    <ResponsiveBar
      data={finalArray1}
      theme={{
        // added
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
      keys={["April", "May"]}
      indexBy="id"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 3,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 10,
        tickPadding: 15,
        tickRotation: isDashboard ? -7 : 0,
        legend: isDashboard ? undefined : "Course Name", // changed
        legendPosition: "left",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Income", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 5,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      // barAriaLabel={function (e) {
      //   return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      // }}
    />
  );
};

export default BarChart;
