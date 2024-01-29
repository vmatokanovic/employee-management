import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";
import { CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { useEmployeesContext } from "@/context/EmployeeContext";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Ime može biti dugačko najmanje 2 slova.",
    })
    .max(50, {
      message: "Ime može biti dugačko najviše 50 slova.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Prezime može biti dugačko najmanje 2 slova.",
    })
    .max(50, {
      message: "Prezime može biti dugačko najviše 50 slova.",
    }),
  url: z.string().min(1, { message: "Poveznica ne smije biti prazna." }),
  gender: z.string().min(1, { message: "Odabir spola je obavezan." }),
  birthDate: z.date({
    required_error: "Molimo odaberite datum rođenja.",
  }),
  startDate: z.date({
    required_error: "Molimo odaberite datum početka rada.",
  }),
  contract: z.string().min(1, { message: "Odabir ugovora je obavezan." }),
  contractDuration: z
    .number({
      required_error: "Trajanje ugovora je obavezno",
    })
    .min(1, { message: "Broj godina mora biti veći od 0" }),
  department: z.string({
    required_error: "Odabir odjela je obavezan",
  }),
  vacationDays: z.string().optional(),
  daysOffDays: z.string().optional(),
  paidVacationDays: z.string().optional(),
});

export default function AddForm({ setOpenDialog }) {
  const { dispatch } = useEmployeesContext();
  const { toast } = useToast();

  const handleAddNew = async (values) => {
    try {
      const newEmployee = {
        firstName: values.firstName,
        lastName: values.lastName,
        url: values.url,
        gender: values.gender,
        birthDate: values.birthDate,
        startDate: values.startDate,
        contract: values.contract,
        contractDuration: values.contractDuration,
        department: values.department,
        vacationDays: values.vacationDays,
        daysOffDays: values.daysOffDays,
        paidVacationDays: values.paidVacationDays,
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, "employees"), newEmployee);
      newEmployee.id = docRef.id;
      dispatch({
        type: "CREATE_EMPLOYEE",
        payload: {
          ...newEmployee,
          birthDate: { seconds: Date.parse(values.birthDate) / 1000 },
          startDate: { seconds: Date.parse(values.startDate) / 1000 },
        },
      });
      setOpenDialog((openDialog) => !openDialog);
      toast({
        title: "Zaposlenik uspješno dodan!",
        description: `${values.firstName} ${values.lastName}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      url: "",
      gender: "",
      contract: "",
      contractDuration: 0,
      vacationDays: "",
      daysOffDays: "",
      paidVacationDays: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    console.log(values);
    handleAddNew(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel>*Ime</FormLabel>
                    <FormControl className="flex flex-col">
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel className="text-right">*Prezime</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8 items-center">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel>*Spol</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex flex-row"
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="male"
                            checked={field.value === "male"}
                            id="gender-male"
                          />
                          <Label htmlFor="gender-male">Muško</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="female"
                            checked={field.value === "female"}
                            id="gender-female"
                          />
                          <Label htmlFor="gender-female">Žensko</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel className="text-nowrap">
                      *Datum rođenja
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd.MM.yyyy")
                            ) : (
                              <span>Odaberi datum</span>
                            )}
                            <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown-buttons"
                          fromYear={1910}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel className=" text-nowrap">
                      *Slika profila
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-8 items-center">
            <FormField
              control={form.control}
              name="contract"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel>*Vrsta ugovora</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex flex-row"
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="fixed"
                            checked={field.value === "fixed"}
                            id="contract-fixed"
                          />
                          <Label htmlFor="contract-fixed">Određeno</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="indefinite"
                            checked={field.value === "indefinite"}
                            id="contract-indefinite"
                          />
                          <Label htmlFor="contract-indefinite">
                            Neodređeno
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel className="text-nowrap">*Početak rada</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd.MM.yyyy")
                            ) : (
                              <span>Odaberi datum</span>
                            )}
                            <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="contractDuration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel className="text-nowrap">
                      *Trajanje ugovora
                    </FormLabel>
                    <FormControl className="flex flex-col">
                      <Input
                        type="number"
                        className="col-span-3"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel>*Odjel</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Odaberi odjel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Odjeli</SelectLabel>
                          <SelectItem value="development">
                            Development
                          </SelectItem>
                          <SelectItem value="hr">Ljudski resursi</SelectItem>
                          <SelectItem value="accounting">
                            Računovodstvo
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="vacationDays"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel className=" text-nowrap">
                      Broj dana godišnjeg odmora
                    </FormLabel>
                    <FormControl>
                      <Input type="number" className="col-span-3" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="daysOffDays"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel className=" text-nowrap">
                      Broj slobodnih dana
                    </FormLabel>
                    <FormControl>
                      <Input type="number" className="col-span-3" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="paidVacationDays"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex w-full items-center gap-3">
                    <FormLabel className=" text-nowrap">
                      Broj dana plaćenog dopusta
                    </FormLabel>
                    <FormControl>
                      <Input type="number" className="col-span-3" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Dodaj</Button>
      </form>
    </Form>
  );
}
