import { createContext, useEffect, useReducer } from "react";
import instance from "../apis";
import { User } from "../interfaces/User";
import { useNavigate } from "react-router-dom";
import userReducer from "../reducers/uerReducer";

type UserContextType = {
  state: {
    users: User[];
    selectedUser?: User;
  };
  handleRemove: (id: number | string) => void;
  onSubmitUser: (data: User) => void;
  getDetail: (id: number | string) => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

type ChildrenProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(userReducer, { users: [] });

  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/users`);
      dispatch({ type: "SET_USERS", payload: data });
    })();
  }, []);

  const handleRemove = async (id: number | string) => {
    if (confirm("Are you sure?")) {
      await instance.delete(`/users/${id}`);
      dispatch({ type: "REMOVE_USER", payload: id });
    }
  };

  const getDetail = async (id: number | string) => {
    const { data } = await instance.get(`/users/${id}`);
    dispatch({ type: "SET_SELECTED_USER", payload: data });
  };

  const onSubmitUser = async (data: User) => {
    try {
      if (data.id) {
        await instance.patch(`/users/${data.id}`, data);
        dispatch({ type: "UPDATE_USER", payload: data });
      } else {
        await instance.post("/users", data);
        dispatch({ type: "ADD_USER", payload: data });
      }
      nav("/admin");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <UserContext.Provider
      value={{ state, handleRemove, onSubmitUser, getDetail }}
    >
      {children}
    </UserContext.Provider>
  );
};
