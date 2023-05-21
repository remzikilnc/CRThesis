import WeeklyRevenue from "@/views/admin/default/components/WeeklyRevenue";
import WeeklyUser from "@/views/admin/default/components/WeeklyUser";
import PieChartCard from "@/views/admin/default/components/PieChartCard";
import {IoMdHome} from "react-icons/io";
import {IoDocuments} from "react-icons/io5";
import {MdBarChart, MdDashboard} from "react-icons/md";

import {columnsDataCheck, columnsDataComplex} from "./variables/columnsData";

import Widget from "@/components/admin/widget/Widget";
import CheckTable from "@/views/admin/default/components/CheckTable";
import ComplexTable from "@/views/admin/default/components/ComplexTable";
import DailyTraffic from "@/views/admin/default/components/DailyTraffic";
import TaskCard from "@/views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import {useDashboardQuery} from "@/store/api/dashboard";
import React from "react";
import FullPageLoading from "@/components/admin/loading/fullpage";

const Dashboard = () => {
    const {data: data, refetch, isLoading} = useDashboardQuery({});
    if (isLoading) {
        return (
            <FullPageLoading/>
        );
    }

    return (<div>
        {/* Card widget */}

        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
            <Widget
                icon={<MdBarChart className="h-7 w-7"/>}
                title={"title"}
                subtitle={"35 ₺"}
            />
            <Widget
                icon={<IoDocuments className="h-6 w-6"/>}
                title={"title"}
                subtitle={"1 ₺"}
            />
            <Widget
                icon={<MdBarChart className="h-7 w-7"/>}
                title={"Toplam Kullanıcı Sayısı"}
                subtitle={data.data?.totalUsersCount}
            />
            <Widget
                icon={<MdBarChart className="h-7 w-7"/>}
                title={"Toplam Ürünler"}
                subtitle={data.data?.totalProductsCount}
            />
            <Widget
                icon={<MdBarChart className="h-7 w-7"/>}
                title={"Aktif Ürünler"}
                subtitle={data.data?.activeProductsCount}
            />
            <Widget
                icon={<IoMdHome className="h-6 w-6"/>}
                title={"Aktif Ürünler"}
                subtitle={data.data?.activeProductsCount}
            />
        </div>

        {/* Charts */}

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <WeeklyUser boardData={data.data?.UserDataByDay} WeeklyChangeData={data.data?.UserDataWeeklyChange}
            />
            <WeeklyRevenue/>
        </div>

        {/* Tables & Charts */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
            {/* Check Table */}
            <div>
                <CheckTable
                    columnsData={columnsDataCheck}
                    tableData={tableDataCheck}
                />
            </div>

            {/* Traffic chart & Pie Chart */}

            <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                <DailyTraffic/>
                <PieChartCard
                    pieChartData={data.data?.parentCategoriesHasItem.categories}
                    pieChartFooterParentCount={data.data?.parentCategoriesHasItem.parent_categories}
                    pieChartFooterChildCount={data.data?.parentCategoriesHasItem.child_categories}
                />
            </div>

            {/* Complex Table , Task & Calendar */}

            <ComplexTable
                columnsData={columnsDataComplex}
                tableData={tableDataComplex}
            />

            {/* Task chart & Calendar */}

            <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                <TaskCard/>
                <div className="grid grid-cols-1 rounded-[20px]">
                </div>
            </div>
        </div>
    </div>);
};

export default Dashboard;
