import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import AddForm from "./AddForm";

export default function AddDialog({ openDialog, setOpenDialog }) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className=" mr-2" />
          Dodaj zaposlenika
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Novi zaposlenik</DialogTitle>
          <DialogDescription>
            Dodajte novog zaposlenika u bazu podataka. Upišite sve potrebne
            informacije o toj osobi. Polja označena * su obavezna.
          </DialogDescription>
        </DialogHeader>
        <AddForm setOpenDialog={setOpenDialog} />
      </DialogContent>
    </Dialog>
  );
}
