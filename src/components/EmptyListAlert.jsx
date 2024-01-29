import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ListPlus } from "lucide-react";

export default function EmptyListAlert() {
  return (
    <Alert className="w-fit mx-auto bg-slate-50">
      <ListPlus className="h-4 w-4" />
      <AlertTitle>Nema zaposlenika!</AlertTitle>
      <AlertDescription>
        Možete dodati nove zaposlenike klikom na Dodaj zaposlenika.
      </AlertDescription>
    </Alert>
  );
}
