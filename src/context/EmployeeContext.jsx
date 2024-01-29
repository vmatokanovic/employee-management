import { createContext, useReducer, useContext } from "react";

export const EmployeesContext = createContext();

export const employeesReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
        filteredEmployees: action.payload,
      };
    case "CREATE_EMPLOYEE":
      return {
        ...state,
        employees: [action.payload, ...state.employees],
        filteredEmployees: [action.payload, ...state.filteredEmployees],
      };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((employees) =>
          employees.id === action.payload.id ? { ...action.payload } : employees
        ),
        filteredEmployees: state.filteredEmployees.map((employees) =>
          employees.id === action.payload.id ? { ...action.payload } : employees
        ),
      };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
        filteredEmployees: state.filteredEmployees.filter(
          (employee) => employee.id !== action.payload
        ),
      };
    case "SELECT_EMPLOYEE":
      return {
        ...state,
        selectedEmployee: state.employees.find(
          (employee) => employee.id === action.payload
        ),
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SEARCH_EMPLOYEES":
      return {
        ...state,
        searchQuery: action.payload,
        filteredEmployees:
          action.payload.length > 0
            ? state.employees.filter((employee) =>
                `${employee.firstName} ${employee.lastName}`
                  .toLowerCase()
                  .includes(action.payload.toLowerCase())
              )
            : state.employees,
      };
    default:
      return state;
  }
};

export const EmployeesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeesReducer, {
    employees: [],
    filteredEmployees: [],
    selectedEmployee: null,
    searchQuery: "",
  });

  return (
    <EmployeesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployeesContext = () => {
  return useContext(EmployeesContext);
};
