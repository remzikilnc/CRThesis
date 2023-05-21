import React from "react";
import ExampleProductIMG from "@/assets/images/products/product1.png";

import {FaAmazonPay, FaAppStore, FaEthereum} from "react-icons/fa";
import Card from "@/components/admin/card";

const HistoryCard = () => {
  const HistoryData = [
    {
      image: ExampleProductIMG,
      title: "Colorful Heaven",
      owner: "Mark Benjamin",
      price: 0.4,
      time: "30s",
    },
    {
      image: ExampleProductIMG,
      title: "Abstract Colors",
      owner: "Esthera Jackson",
      price: 2.4,
      time: "50m",
    },
    {
      image: ExampleProductIMG,
      title: "ETH AI Brain",
      owner: "Nick Wilson",
      price: 0.3,
      time: "20s",
    },
    {
      image: ExampleProductIMG,
      title: "Swipe Circles",
      owner: " Peter Will",
      price: 0.4,
      time: "4h",
    },
    {
      image: ExampleProductIMG,
      title: "Mesh Gradients",
      owner: "Will Smith",
      price: 0.4,
      time: "30s",
    },
    {
      image: ExampleProductIMG,
      title: "3D Cubes Art",
      owner: " Manny Gates",
      price: 0.4,
      time: "2m",
    },
  ];

  return (
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      {/* HistoryCard Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          History
        </div>
        <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          See all
        </button>
      </div>

      {/* History CardData */}

      {HistoryData.map((data, index) => (
        <div className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center">
              <img
                className="h-full w-full rounded-xl"
                src={data.image}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                {" "}
                {data.title}
              </h5>
              <p className="mt-1 text-sm font-normal text-gray-600">
                {" "}
                {data.owner}{" "}
              </p>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
            <div>
                <FaAppStore></FaAppStore>
            </div>
            <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
              <p> {} </p>
              {data.price} <p className="ml-1">TL</p>
            </div>
            <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
              <p>{data.time}</p>
              <p className="ml-1">ago</p>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default HistoryCard;
