import Card from "@/components/admin/card";
import CardMenu from "@/components/admin/card/CardMenu";
import Switch from "@/components/admin/switch";
import React from "react";

function Notification() {
  return (
    <Card extra={"w-full h-full p-[40px] !rounded-t-none  !pb-10"}>
      <div className="relative mb-3 flex items-center justify-between pt-1 ">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Notifications
        </h4>
        <CardMenu />
      </div>
      <div className="flex flex-col">
        <div className="mt-4 flex items-center gap-3">
          <Switch id="switch5" />
          <label
            for="checkbox5"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Company news notifications
          </label>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Switch id="switch6" />
          <label
            for="checkbox6"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            New launches and projects
          </label>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Switch id="switch7" />
          <label
            for="checkbox7"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Monthly product changes
          </label>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Switch id="switch8" />
          <label
            for="checkbox8"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Subscribe to newsletter
          </label>
        </div>
      </div>
    </Card>
  );
}

export default Notification;
