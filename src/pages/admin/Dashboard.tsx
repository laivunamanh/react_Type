import { Link } from "react-router-dom";
import { Product } from "../../interfaces/Product";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";

type Props = {
	products: Product[];
	handleRemove: (id: number | string) => void;
};

const Dashboard = () => {
	const { state, handleRemove } = useContext(ProductContext);
	return (
		<div>
			<Link to={`/admin/product-add`} className="btn btn-success">
				Add new product
			</Link>
			<table className="table table-bordered table-striped">
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Price</th>
						<th>Description</th>
						<th>Thumbnail</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{state.products.map((item) => (
						<tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.title}</td>
							<td>{item.price}</td>
							<td>{item.description}</td>
							<td>
								<img src={item.thumbnail} alt={item.title} width={100} />
							</td>
							<td>
								<Link to={`/admin/product-edit/${item.id}`} className="btn btn-warning">
									Edit
								</Link>
								<button className="btn btn-danger" onClick={() => handleRemove(item.id!)}>
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

export default Dashboard;
