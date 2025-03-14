import { CurrentIcon, StartupStatsIcon, UserStatsIcon } from "@/Icon/SvgIcon";
import StatsCard from "./StatsCard";
import { useGetDashboardStatsQuery } from "@/store/features/dashboardApi";
import { useEffect } from "react";

const data1 = {
  title: "Current ongoing deals",
  Icon: <CurrentIcon />,
};
const data2 = {
  title: "Startups Listed",
  Icon: <StartupStatsIcon />,
};
const data3 = {
  title: "New User Registrations",
  Icon: <UserStatsIcon />,
};

const StatsSection = () => {
  const { data: stats, isLoading, error, refetch } = useGetDashboardStatsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="h-32 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-32 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-32 bg-gray-200 animate-pulse rounded-md"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading stats</div>;
  }

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-5">
      <StatsCard data={data1} statsValue={stats?.ongoingDeals ?? 0} />
      <StatsCard data={data2} statsValue={stats?.listedStartups ?? 0} />
      <StatsCard data={data3} statsValue={stats?.newUserRegistrations ?? 0} />
    </div>
  );
};

export default StatsSection;
