import { Avatar } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

export default function EmployeeCardSkeleton() {
  return (
    <div className="flex flex-col justify-between items-center bg-slate-100 w-[250px] h-[250px] p-3 border-2 rounded-lg">
      <Avatar className="w-[100px] h-[100px] border-black">
        <Skeleton className="w-[100px] bg-white" />
      </Avatar>
      <div className="text-center">
        <Skeleton className="bg-white h-[20px] w-[150px]" />
        <Separator className="my-2" />
        <Skeleton className="bg-white h-[20px]" />
      </div>
      <Skeleton className="w-full h-[38px] bg-white" />
      {/* <Button className="w-full" variant="outline">
        Detalji
      </Button> */}
    </div>
  );
}
