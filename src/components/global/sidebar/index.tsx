"use client";
import { DashboardIcon, DownArrowIcon, Logo, UserList } from "@/Icon/SvgIcon";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SideBar = () => {
  const pathname = usePathname();


  const router = useRouter();




  return (
    <aside className="hidden md:flex flex-col items-start justify-normal fixed top-0 left-0 bottom-0 bg-[#00173A] w-[175px] px-[4px] py-5 gap-y-[36px] ">
      <div className="pt-[5px] pl-[16px] text-white">
        {" "}
        <Logo />{" "}
      </div>
      <div className="flex flex-col items-start justify-start w-full gap-y-[10px] pl-[13px] ">
        <Link
          href={`/dashboard`}
          className={cn(
            "flex flex-row items-center justify-start w-full gap-x-[9px] py-[7px] text-white group "
          )}
        >
          <div
            className={cn(
              "p-[6px] rounded-full group-hover:bg-white transition-all duration-100 ease-in-out ",
              pathname === "/dashboard" && "bg-white"
            )}
          >
            {" "}
            <DashboardIcon
              className={cn(
                "group-hover:fill-[#00173A] fill-[#8080A9] transition-all duration-100 ease-in-out ",
                pathname === "/dashboard" && "fill-[#00173A]"
              )}
            />
          </div>
          <span
            className={cn(
              "text-[#8080A9] font-urbanist-regular_400  text-[14px] leading-normal group-hover:text-white group-hover:font-urbanist-semibold_600 transition-all duration-100 ease-in-out ",
              pathname === "/dashboard" &&
                "font-urbanist-semibold_600 text-white"
            )}
          >
            Dashboard
          </span>
        </Link>
        <DropDownNavigation
          title="Investor"
          Links={[
            { href: "/dashboard/investor/registrations", title: "Registrations" },
            { href: "/dashboard/investor/management", title: "Management" },
          ]}
        />
        <DropDownNavigation
          title="Mentor"
          Links={[
            { href: "/dashboard/mentor/registrations", title: "Registrations" },
            { href: "/dashboard/mentor/management", title: "Management" },
          ]}
        />
        <DropDownNavigation
          title="Startups"
          Links={[
            { href: "/dashboard/startup/registration", title: "Registration" },
            { href: "/dashboard/startup/deal-registration", title: "Deal Registration" },
            { href: "/dashboard/startup/active-deals", title: "Active Deals" },
            { href: "/dashboard/startup/startup-rounds", title: "startup-rounds" },
          ]}
        />
        <DropDownNavigation
          title="Syndicates"
          Links={[
            {
              href: "/dashboard/syndicates/registrations",
              title: "Registrations",
            },
            {
              href: "/dashboard/syndicates/active-syndicates",
              title: "Active Syndicates",
            },
          ]}
        />
      </div>
      <div className="flex flex-1 w-full  justify-end flex-col px-5 py-5">
        <LogOut
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("authToken");
            router.push("/");
          }}
          className="text-[#FFF] cursor-pointer"
        />
      </div>
    </aside>
  );
};

export default SideBar;

type DropDownNavigationProps = {
  title: string;
  Links: {
    href: string;
    title: string;
  }[];
};

const DropDownNavigation = ({
  title,
  Links,
}: DropDownNavigationProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    
      setIsDropdownOpen(!isDropdownOpen);
  };
  const pathname = usePathname();
      
  return (
    <>
      {/* Dropdown button */}
      <button
        className=" flex flex-row font-urbanist-italic_400  items-center gap-[9px] group  justify-between  w-full py-[11px] pr-[20px] text-[#FFF]"
        onClick={toggleDropdown}
      >
        <div className="flex flex-row items-center justify-start gap-[9px]">
          <div
            className={cn(
              "p-[6px] rounded-full group-hover:bg-white",
              isDropdownOpen && "bg-white"
            )}
          >
            <UserList
              className={cn(
                " group-hover:fill-[#00173A] fill-[#8080A9] transition-all duration-100 ease-in-out",
                isDropdownOpen && "fill-[#00173A]"
              )}
            />
          </div>
          <span
            className={cn(
              "text-[#8080A9] font-urbanist-regular_400  text-[14px] leading-normal group-hover:text-white group-hover:font-urbanist-semibold_600 transition-all duration-100 ease-in-out",
              isDropdownOpen && "text-white font-urbanist-semibold_600"
            )}
          >
            {title}
          </span>
        </div>
        <span
          className={cn(
            "text-[#FFF] group-hover:rotate-180 transition-all duration-100 ease-in-out",
            isDropdownOpen && "rotate-180"
          )}
        >
          <DownArrowIcon
            className={cn(
              "group-hover:stroke-white",
              isDropdownOpen && "stroke-white"
            )}
          />
        </span>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <ul className=" pl-[32px] flex flex-col items-start justify-start gap-4 ">
          {Links.map((link) => {
            return (
              <li key={link.title}>
                <Link
                  className={cn(
                    "text-[#8080A9] hover:text-[#FFF] text-[14px] font-urbanist-regular_400 transition-all duration-100 ease-in-out ",
                    pathname === link.href && "text-[#FFF]"
                  )}
                  href={link.href}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
