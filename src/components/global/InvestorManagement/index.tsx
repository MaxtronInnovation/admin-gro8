"use client";
import { useGetInvestorManagementQuery } from "@/store/features/managementApi";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import CustomPagination from "../CustomPagination";
import InvestroTableLoader from "../InvestorRegistrations/InvestroTableLoader";
import InvestorManagementTable from "./InvestorManagementTable";

const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError | undefined
) => {
    if (!error) return "Unknown error occurred";

    if ("status" in error) {
        return `Error: ${error.status} - ${error.data || "Unknown error"}`;
    }

    return error.message || "Unknown error occurred";
};

const InvestorManagement = () => {
    // const { pathname } = usePaths();
    // const isInvestorManagement = pathname === "/dashboard/investor/management";

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const {
        data: investorResponse,
        isLoading,
        error: investorError,
        refetch,
    } = useGetInvestorManagementQuery(
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
                    Investor Management
                </p>
            </div>
            {isLoading ? (
                <InvestroTableLoader />
            ) : investorError ? (
                <div className="w-full p-4 text-center text-red-500">
                    {getErrorMessage(investorError)}
                </div>
            ) : (
                <InvestorManagementTable data={investorResponse?.data || []} />
            )}
            {investorResponse?.totalPages ? (
                <div className="flex flex-row items-end justify-end w-full font-rubik-semibold_600">
                    <CustomPagination
                        currentPage={currentPage}
                        totalPages={investorResponse.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default InvestorManagement;