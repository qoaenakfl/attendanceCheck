export const getReportDay = () => {
  const sysDay = new Date();
  const day = ["sun", "wed", "wed", "wed", "sun", "sun", "sun"];

  return new Promise((resolve, reject) => {
    resolve(day[sysDay.getDay()]);
  });
};

export const getReportDate = () => {
  return new Promise((resolve, reject) => {
    const sysDay = new Date();
    const day = [0, 2, 1, 0, 3, 2, 1];
    const YMD =
      "" + sysDay.getFullYear() + (sysDay.getMonth() + 1) + sysDay.getDate();
    resolve(YMD);
  });
};
