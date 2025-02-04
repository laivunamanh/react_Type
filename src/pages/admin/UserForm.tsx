import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as z from "zod";
import { User } from "../../interfaces/User";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContexts";


const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  role: z.string().optional(),
});

const UserForm = () => {
  const { id } = useParams();

  const { onSubmitUser, getDetail, state } = useContext(UserContext);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  if (id) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      (async () => {
        getDetail(id);
        reset(state.selectedUser);
      })();
    }, [id]);
  }

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onSubmitUser({ ...data, id }))}>
        <h1>{id ? "Update user" : "Add user"}</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="text"
            className="form-control"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPass" className="form-label">
            confirmPass
          </label>
          <input
            type="confirmPass"
            className="form-control"
            {...register("confirmPass")}
          />
          {errors.confirmPass && (
            <span className="text-danger">{errors.confirmPass.message}</span>
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-primary">
            {id ? "Update user" : "Add user"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
