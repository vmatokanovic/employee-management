import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import EditForm from "./EditForm";

export default function EditDialog({ setOpenDialog, selectedEmployee }) {
  if (selectedEmployee === null) return;

  return (
    <DialogContent className="max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Novi zaposlenik</DialogTitle>
        <DialogDescription>
          Dodajte novog zaposlenika u bazu podataka. Upišite sve potrebne
          informacije o toj osobi. Polja označena * su obavezna.
        </DialogDescription>
      </DialogHeader>
      <EditForm
        setOpenDialog={setOpenDialog}
        selectedEmployee={selectedEmployee}
      />
    </DialogContent>
  );
}
