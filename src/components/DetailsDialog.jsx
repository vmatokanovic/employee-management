import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

import { formatDate } from "@/utils/formatUtils";

export default function DetailsDialog({ selectedEmployee }) {
  const {
    url,
    firstName,
    lastName,
    gender,
    department,
    contract,
    contractDuration,
    vacationDays,
    daysOffDays,
    paidVacationDays,
  } = selectedEmployee;

  const birthDate = new Date(selectedEmployee.birthDate.seconds * 1000);
  const startDate = new Date(selectedEmployee.startDate.seconds * 1000);

  if (selectedEmployee === null) return;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex flex-row gap-6 justify-center">
          <Avatar className="w-[100px] h-[100px] border-black">
            <AvatarImage className="object-cover" src={url} alt="@shadcn" />
            <AvatarFallback>
              {firstName.slice(0, 1)}
              {lastName.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <p>Ime:</p>
              <p className=" font-normal mt-1">{firstName}</p>
            </div>
            <div className="flex flex-col">
              <p>Prezime:</p>
              <p className=" font-normal mt-1">{lastName}</p>
            </div>
            <div className="flex flex-col">
              <p>Spol:</p>
              <p className=" font-normal mt-1">
                {gender === "male" ? "Muško" : "Žensko"}
              </p>
            </div>
            <div className="flex flex-col">
              <p>Datum rođenja:</p>
              <p className=" font-normal mt-1">{formatDate(birthDate)}</p>
            </div>
          </div>
        </DialogTitle>
      </DialogHeader>
      <Separator />
      <div className="text-base flex flex-row gap-1">
        <div>
          <div>
            Odjel:{" "}
            <Badge>
              {department === "hr" && "Ljudski resursi"}
              {department === "development" && "Development"}
              {department === "accounting" && "Računovodstvo"}
            </Badge>
          </div>
          <div>
            Početak rada: <Badge>{formatDate(startDate)}</Badge>
          </div>
          <div>
            Vrsta ugovora:{" "}
            <Badge>{contract === "fixed" ? "Određeno" : "Neodređeno"}</Badge>
          </div>
          <div>
            Trajanje ugovora: <Badge>{contractDuration}</Badge>
          </div>
        </div>
        <Separator orientation="vertical" className="mx-1" />
        <div>
          <div>
            Broj dana godišnjeg odmora:{" "}
            <Badge>{vacationDays === "" ? "/" : vacationDays}</Badge>
          </div>
          <div>
            Broj slobodnih dana:{" "}
            <Badge>{daysOffDays === "" ? "/" : daysOffDays}</Badge>
          </div>
          <div>
            Broj dana plaćenog dopusta:{" "}
            <Badge>{paidVacationDays === "" ? "/" : paidVacationDays}</Badge>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
