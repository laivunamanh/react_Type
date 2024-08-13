import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User } from "../interfaces/User";
import instance from "../apis";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  isLogin?: boolean;
};

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255),
  confirmPass: z
    .string()
    .min(6, "Confirm password must be at least 6 characters")
    .max(255),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255),
});

const AuthForm = ({ isLogin }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<User>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const nav = useNavigate();
  const onSubmit = async (user: User) => {
    if (isLogin) {
      const { data } = await instance.post("/login", user);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      nav("/");
    } else {
      await instance.post("/register", user);
      nav("/login");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h1 className="text-center mb-4">{isLogin ? "Login" : "Register"}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              type="text"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="confirmPass" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPass"
                className={`form-control ${
                  errors.confirmPass ? "is-invalid" : ""
                }`}
                type="password"
                {...register("confirmPass", {
                  required: "Confirm password is required",
                })}
              />
              {errors.confirmPass && (
                <div className="invalid-feedback">
                  {errors.confirmPass.message}
                </div>
              )}
            </div>
          )}

          <div className="mb-3">
            <button className="btn btn-primary w-100" type="submit">
              {isLogin ? "Login" : "Register"}
            </button><hr/>
            <Link to="/">
              <button className="btn btn-primary w-100">Quay lai</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
