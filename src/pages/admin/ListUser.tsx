import { Link } from "react-router-dom";
import { User } from "../../interfaces/User";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContexts";


type Props = {
  users: User[];
  handleRemove: (id: number | string) => void;
};

const ListUser = () => {
  const { state, handleRemove } = useContext(UserContext);
  return (
    <div>
      <Link to={`/admin/user-add`} className="btn btn-success">
        Add new user
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>confirmPass</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {state.users.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.confirmPass}</td>

              <td>
                <Link
                  to={`/admin/user-edit/${item.id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item.id!)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
