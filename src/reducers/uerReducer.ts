import { User } from "../interfaces/User";

type State = {
  users: User[];
  selectedUser?: User;
};
type Action =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "REMOVE_USER"; payload: number | string }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "SET_SELECTED_USER"; payload: User | undefined };

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((item) => item.id !== action.payload),
      };

    case "SET_SELECTED_USER":
      return { ...state, selectedUser: action.payload };

    default:
      return state;
  }
};

export default userReducer;
