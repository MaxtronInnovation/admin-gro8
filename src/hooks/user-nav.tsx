import { usePathname } from "next/navigation";

export const usePaths = () => {
  const pathname = usePathname();
  const path = pathname.split("/");
  const page = path[path.length - 1];
  console.log(page);
  return { pathname, page };
};
