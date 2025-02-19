// components/SyndicateTable.tsx
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { usePaths } from "@/hooks/user-nav";
import Link from "next/link";

type User = {
  name: string;
  accountType: string;
  registrationDate: string;
  linkedin: string;
  country: string;
};

const dummyData: User[] = [
  {
    name: "John Doe",
    accountType: "investor",
    registrationDate: "2023-01-15",
    linkedin: "https://linkedin.com/in/johndoe",
    country: "USA",
  },
  {
    name: "Jane Smith",
    accountType: "mentor",
    registrationDate: "2023-02-10",
    linkedin: "https://linkedin.com/in/janesmith",
    country: "UK",
  },
  {
    name: "Rahul Mehta",
    accountType: "investor",
    registrationDate: "2023-03-05",
    linkedin: "https://linkedin.com/in/rahulmehta",
    country: "India",
  },
  {
    name: "Jane Smith",
    accountType: "mentor",
    registrationDate: "2023-02-10",
    linkedin: "https://linkedin.com/in/janesmith",
    country: "UK",
  },
  {
    name: "Rahul Mehta",
    accountType: "investor",
    registrationDate: "2023-03-05",
    linkedin: "https://linkedin.com/in/rahulmehta",
    country: "India",
  },
  {
    name: "Jane Smith",
    accountType: "mentor",
    registrationDate: "2023-02-10",
    linkedin: "https://linkedin.com/in/janesmith",
    country: "UK",
  },
  {
    name: "Rahul Mehta",
    accountType: "investor",
    registrationDate: "2023-03-05",
    linkedin: "https://linkedin.com/in/rahulmehta",
    country: "India",
  },
];

const SyndicateTable: React.FC = () => {
  const { pathname } = usePaths();
  const isLoading = false; // Replace with actual loading logic

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "accountType",
      header: "Account Type",
      cell: ({ getValue }) => {
        return (
          <div className="flex flex-col items-start justify-start">
            <p
              className={cn(
                getValue<string>() === "investor" && "bg-[#6B9CEC]",
                getValue<string>() === "mentor" && "bg-[#F56D6D]",
                "px-1 py-[1px] text-[8px] font-bold leading-normal rounded-[8px] flex flex-col items-center justify-center  text-[#FEFEFE] uppercase"
              )}
            >
              {getValue<string>()}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "registrationDate",
      header: "Registration Date",
    },
    {
      accessorKey: "linkedin",
      header: "LinkedIn Account",
      cell: ({ getValue }) => (
        <a
          href={getValue<string>()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View
        </a>
      ),
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <Link
          href={`${pathname === "/dashboard/syndicates/registrations"
              ? "/dashboard/syndicates/registrations/1"
              : pathname === "/dashboard/syndicates/active-syndicates"
                ? "/dashboard/syndicates/active-syndicates/1"
                : "dashboard/syndicates/registrations/1"
            }`}
          className=" flex flex-row items-center justify-start gap-2"
        >
          <span className="text-[16px] font-urbanist-semibold_600 ">
            {" "}
            View User Details
          </span>{" "}
          <ChevronRight className=" text-[#0061FE] w-[16px]" />
        </Link>
      ),
    },
  ];
  const table = useReactTable({
    data: dummyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="w-full p-4">
        <div className="h-10 bg-gray-200 animate-pulse rounded-md mb-2"></div>
        <div className="h-10 bg-gray-200 animate-pulse rounded-md mb-2"></div>
        <div className="h-10 bg-gray-200 animate-pulse rounded-md mb-2"></div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border border-[#E8E8F1] table-auto">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-5 py-[13px] text-left text-[12px] font-rubik-regular_400 text-[#32363B] border-b border-[#E8E8F1]"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-5 py-[13px] text-[14px] font-rubik-regular_400 text-[#32363B] border-t border-[#E8E8F1]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SyndicateTable;
