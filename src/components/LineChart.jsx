import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
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

  useEffect(() => {
    getAllRevenue();
  }, []);
  const courseNames = [];

  // let lineArray = [];
  let cnt = 0;
  // const getAllRevenue = async () => {
  //   try {
  //     const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
  //     if (!accessToken) {
  //       throw new Error("Access token is missing.");
  //     }
  //     const result = await axios
  //       .get(`http://localhost:5000/getAllRevenue`, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           // "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         if (response) {
  //           if (response.data) {
  //             setAllData(response.data.data);
  //             console.log(response.data.data);
  //             console.log("all", allData);
  //             response.data.data.map((e) => {
  //               if (courseNames.includes(e.courseInfo.name) == false) {
  //                 cnt++;
  //                 courseNames.push(e.courseInfo.name);
  //                 const finalData = {};
  //                 const a = {};
  //                 const b = [];
  //                 const xy = moment(e.buyDate).format("MMMM");
  //                 // finalData.name = e.courseInfo.name;
  //                 finalData.id = e.courseInfo.name;
  //                 finalData.label = e.courseInfo.name;
  //                 finalData.value = 0;
  //                 finalData.value += e.courseAmount;
  //                 finalData.color = colorOfFields[cnt];
  //                 a.x = xy;
  //                 a.y = finalData.value;
  //                 b.push(a);
  //                 finalData.data = b;
  //                 finalArray.push(finalData);
  //               } else {
  //                 for (const i of finalArray) {
  //                   const arr1 = i.data;
  //                   if (i.label == e.courseInfo.name) {
  //                     i.value += e.courseAmount;
  //                     for (const j of arr1) {
  //                       if (j.x == i[moment(e.buyDate).format("MMMM")]) {
  //                         j.y = e.courseAmount;
  //                       } else {
  //                         if (j.x != moment(e.buyDate).format("MMMM")) {
  //                           const a = {};
  //                           a.x = moment(e.buyDate).format("MMMM");
  //                           a.y = e.courseAmount;
  //                           arr1.push(a);
  //                           console.log(a);
  //                           break;
  //                         } else {
  //                           j.y += e.courseAmount;
  //                         }
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //               setFinalArray1(finalArray);
  //             });
  //           }
  //           console.log(finalArray);
  //         }
  //       })
  //       .catch((err) => {
  //         // toast.error(err.response.data.message);
  //         console.log(err.response.data);
  //         // setError(err.response.data.message);
  //       });
  //   } catch (error) {
  //     console.error("Error during signup:", error);
  //   }
  // };
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
                  const a = {};
                  const b = [];
                  const xy = moment(e.buyDate).format("MMMM");
                  // finalData.name = e.courseInfo.name;
                  finalData.id = e.courseInfo.name;
                  finalData.label = e.courseInfo.name;
                  finalData.value = 0;
                  finalData.value += e.courseAmount;
                  finalData.color = colorOfFields[cnt];
                  a.x = xy;
                  a.y = finalData.value;
                  b.push(a);
                  finalData.data = b;
                  finalArray.push(finalData);
                } else {
                  for (const i of finalArray) {
                    const arr1 = i.data;
                    if (i.label == e.courseInfo.name) {
                      i.value += e.courseAmount;
                      for (const j of arr1) {
                        if (j.x == i[moment(e.buyDate).format("MMMM")]) {
                          j.y = e.courseAmount;
                        } else {
                          if (j.x != moment(e.buyDate).format("MMMM")) {
                            const a = {};
                            a.x = moment(e.buyDate).format("MMMM");
                            a.y = e.courseAmount;
                            arr1.push(a);
                            console.log(a);
                            break;
                          } else {
                            j.y += e.courseAmount;
                          }
                        }
                      }
                    }
                  }
                }
                setFinalArray1(finalArray);
              });
            }
            console.log(finalArray);
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
    // <ResponsiveLine
    //   data={data}
    //   theme={{
    //     axis: {
    //       domain: {
    //         line: {
    //           stroke: colors.grey[100],
    //         },
    //       },
    //       legend: {
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //       ticks: {
    //         line: {
    //           stroke: colors.grey[100],
    //           strokeWidth: 1,
    //         },
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //     },
    //     legends: {
    //       text: {
    //         fill: colors.grey[100],
    //       },
    //     },
    //     tooltip: {
    //       container: {
    //         color: colors.primary[500],
    //       },
    //     },
    //   }}
    //   colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
    //   margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    //   xScale={{ type: "point" }}
    //   yScale={{
    //     type: "linear",
    //     min: "auto",
    //     max: "auto",
    //     stacked: true,
    //     reverse: false,
    //   }}
    //   yFormat=" >-.2f"
    //   curve="catmullRom"
    //   axisTop={null}
    //   axisRight={null}
    //   axisBottom={{
    //     // orient: "bottom",
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: isDashboard ? undefined : "Month", // added
    //     legendOffset: 36,
    //     legendPosition: "middle",
    //     truncateTickAt: 0,
    //   }}
    //   axisLeft={{
    //     // orient: "left",
    //     tickValues: 5, // added
    //     tickSize: 3,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: isDashboard ? undefined : "Income", // added
    //     legendOffset: -40,
    //     legendPosition: "middle",
    //     truncateTickAt: 0,
    //   }}
    //   enableGridX={false}
    //   enableGridY={false}
    //   pointSize={8}
    //   pointColor={{ theme: "background" }}
    //   pointBorderWidth={2}
    //   pointBorderColor={{ from: "serieColor" }}
    //   pointLabelYOffset={-12}
    //   pointLabel="data.yFormatted"
    //   useMesh={true}
    //   legends={[
    //     {
    //       anchor: "top-right",
    //       direction: "column",
    //       justify: false,
    //       translateX: -25,
    //       translateY: 0,
    //       itemsSpacing: 0,
    //       itemDirection: "left-to-right",
    //       itemWidth: 80,
    //       itemHeight: 20,
    //       itemOpacity: 0.75,
    //       symbolSize: 12,
    //       symbolShape: "circle",
    //       symbolBorderColor: "rgba(0, 0, 0, .5)",
    //       effects: [
    //         {
    //           on: "hover",
    //           style: {
    //             itemBackground: "rgba(0, 0, 0, .03)",
    //             itemOpacity: 1,
    //           },
    //         },
    //       ],
    //     },
    //   ]}
    // />
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
