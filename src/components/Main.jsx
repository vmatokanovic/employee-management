import { useEffect, useState } from "react";

import EmployeeCard from "./EmployeeCard";
import EmployeeCardSkeleton from "./EmployeeCardSkeleton";
import EmptyListAlert from "./EmptyListAlert";
import AddDialog from "./AddDialog";

import { useEmployeesContext } from "@/context/EmployeeContext";

import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

export default function Main({ isLoading, setIsLoading }) {
  const [openDialog, setOpenDialog] = useState(false);
  const { filteredEmployees, dispatch } = useEmployeesContext();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const q = query(collection(db, "employees"));
        const querySnapshot = await getDocs(q);

        const newData = [];

        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() });
        });

        // console.log("new data", newData);
        dispatch({ type: "SET_EMPLOYEES", payload: newData });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, [dispatch, setIsLoading]);

  return (
    <section className="mt-2">
      <AddDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />

      {isLoading ? (
        <div className="grid justify-center w-full grid-cols-[repeat(auto-fit,250px)] gap-10 mx-auto my-8 mt-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <EmployeeCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredEmployees.length > 0 ? (
        <div className="grid justify-center w-full grid-cols-[repeat(auto-fit,250px)] gap-10 mx-auto my-8 mt-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <EmptyListAlert />
      )}
    </section>
  );
}
