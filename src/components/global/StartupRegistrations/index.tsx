"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import StartupTable from "./StartupTable";
import { usePaths } from "@/hooks/user-nav";
import { useGetStartupRegistrationsQuery } from "@/store/features/dashboardApi";
import CustomPagination from "../CustomPagination";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  if (!error) return "Unknown error occurred";

  if ("status" in error) {
    return `Error: ${error.status} - ${error.data || "Unknown error"}`;
  }

  return error.message || "Unknown error occurred";
};

const StartupRegistrations = () => {
  const { pathname } = usePaths();
  const isStartupList = pathname === "/dashboard/startup/registration";

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    data: startupResponse,
    isLoading,
    error: startupError,
    refetch,
  } = useGetStartupRegistrationsQuery(
    {
      page: currentPage,
      pageSize,
    },
    {
      skip: typeof window === "undefined",
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-5 bg-[#FFF] flex flex-col items-start justify-start gap-3 border border-solid border-[#E8E8F1] rounded-[12px] w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-[#26252F] font-urbanist-regular_400 leading-[110%] text-[25px]">
          Startup Registrations
        </p>
        {!isStartupList && (
          <Link
            href="/dashboard/startup/deal-registration"
            className="px-[15px] py-[11px] text-[#000] font-urbanist-semibold_600 text-[16px] flex flex-row gap-[10px]"
          >
            <span>View all incoming deals</span>
            <ChevronRight className="w-[16px] text-[#0061FE]" />
          </Link>
        )}
      </div>
      {isLoading ? (
        <div className="w-full p-4">
          <div className="h-10 bg-gray-200 animate-pulse rounded-md mb-2"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded-md mb-2"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded-md mb-2"></div>
        </div>
      ) : startupError ? (
        <div className="w-full p-4 text-center text-red-500">
          {getErrorMessage(startupError)}
        </div>
      ) : (
        <StartupTable data={startupResponse?.data || []} />
      )}
      {isStartupList && startupResponse?.totalPages ? (
        <div className="flex flex-row items-end justify-end w-full font-rubik-semibold_600">
          <CustomPagination
            currentPage={currentPage}
            totalPages={startupResponse.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default StartupRegistrations;
