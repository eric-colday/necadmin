"use client";

import React from "react";
import Chart from "@/app/components/dashboard/chart/Chart";
import FeaturedInfo from "@/app/components/dashboard/featuredInfo.jsx/FeaturedInfo";
import WidgetLeft from "@/app/components/dashboard/widgetLeft/WidgetLeft";
import WidgetRight from "@/app/components/dashboard/widgetRight/WidgetRight";

const Dashboard = () => {

  return (
    <div>
      <div className="ml-80 px-5 py-10 max-[818px]:ml-2 max-[818px]:pt-28">
        <FeaturedInfo />
        <Chart />
        <div className="flex mt-10 gap-5 max-[1339px]:flex-col ">
          <WidgetRight />
          <WidgetLeft />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
