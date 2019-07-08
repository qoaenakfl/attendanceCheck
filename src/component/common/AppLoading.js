import React from "react";
import { Spin } from "antd";

const AppLoading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Spin tip={"페이지 로딩중..."} size="large" />
    </div>
  );
};

export default AppLoading;
