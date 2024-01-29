import { useEmployeesContext } from "@/context/EmployeeContext";
import { Input } from "./ui/input";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default function Header({ isLoading }) {
  const { employees, searchQuery, dispatch } = useEmployeesContext();

  return (
    <header className="flex flex-row justify-between items-center h-[80px] px-2">
      <Users size={48} />
      <Input
        className="max-w-[250px] "
        placeholder="Search"
        value={searchQuery}
        onChange={(e) =>
          dispatch({ type: "SEARCH_EMPLOYEES", payload: e.target.value })
        }
      />
      {isLoading ? (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      ) : (
        <>
          <Badge>Broj zaposlenika: {employees.length}</Badge>
        </>
      )}
    </header>
  );
}
