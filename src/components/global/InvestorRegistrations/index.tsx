"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import InvestorTable from "./InvestorTable";
import { usePaths } from "@/hooks/user-nav";

const InvestorRegistrations = () => {
  const { pathname } = usePaths();
  const isInvestorList = pathname === "/dashboard/investor/registrations";
  return (
    <div className="p-5 bg-[#FFF] flex flex-col items-start justify-start gap-3 border border-solid border-[#E8E8F1] rounded-[12px] w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-[#26252F] font-urbanist-regular_400 leading-[110%] text-[25px]">
          Investor Registrations
        </p>
        {isInvestorList ? (
          <></>
        ) : (
          <Link
            href="/dashboard/investor/registrations"
            className="px-[15px] py-[11px] text-[#000] font-urbanist-semibold_600 text-[16px] flex flex-row capitalize gap-[10px]"
          >
            <span>view all Investor</span>
            <ChevronRight className="w-[16px] text-[#0061FE]" />
          </Link>
        )}
      </div>
      <InvestorTable />
      {isInvestorList ? (<div className="flex flex-row items-end justify-end w-full font-rubik-semibold_600 ">pagination</div>):(<></>)}
     
    </div>
  );
};

export default InvestorRegistrations;
