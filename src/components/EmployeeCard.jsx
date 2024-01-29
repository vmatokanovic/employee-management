import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DetailsDialog from "./DetailsDialog";
import { useEmployeesContext } from "@/context/EmployeeContext";
import EditDialog from "./EditDialog";
import { useState } from "react";
import { Eye, Pencil } from "lucide-react";

export default function EmployeeCard({ employee }) {
  const [openDialog, setOpenDialog] = useState(false);

  const { firstName, lastName, department, url, id } = employee;
  const { selectedEmployee, dispatch } = useEmployeesContext();

  function handleDetailsClick(id) {
    dispatch({ type: "SELECT_EMPLOYEE", payload: id });
  }

  function handleEditClick(id) {
    dispatch({ type: "SELECT_EMPLOYEE", payload: id });
  }

  return (
    <div className="flex flex-col justify-between items-center bg-slate-100 w-[250px] h-[250px] p-3 border-2 rounded-lg">
      <Avatar className="w-[100px] h-[100px] border-black">
        <AvatarImage className="object-cover" src={url} alt="@shadcn" />
        <AvatarFallback className="bg-slate-50 font-bold text-slate-400">
          {firstName.slice(0, 1)}
          {lastName.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
        <p className="text-slate-700">
          <strong>
            {firstName} {lastName}
          </strong>
        </p>
        <Separator className="my-1" />
        <p className=" text-slate-500 pb-1">
          {department === "hr" && "Ljudski resursi"}
          {department === "development" && "Development"}
          {department === "accounting" && "Računovodstvo"}
        </p>
      </div>
      <div className="flex w-full flex-row justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => handleDetailsClick(id)}>
              <Eye className="mr-2" size={16} />
              Detalji
            </Button>
          </DialogTrigger>
          {selectedEmployee && (
            <DetailsDialog selectedEmployee={selectedEmployee} />
          )}
        </Dialog>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => handleEditClick(id)}>
              <Pencil className="mr-2" size={16} />
              Uredi
            </Button>
          </DialogTrigger>
          {selectedEmployee && (
            <EditDialog
              setOpenDialog={setOpenDialog}
              selectedEmployee={selectedEmployee}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
}
