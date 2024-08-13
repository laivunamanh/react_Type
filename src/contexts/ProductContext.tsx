import { createContext, useEffect, useReducer } from "react";
import instance from "../apis";
import { Product } from "../interfaces/Product";
import { useNavigate } from "react-router-dom";
import productReducer from "../reducers/productReducer";

type ProductContextType = {
	state: {
		products: Product[];
		seletedProduct?: Product;
	};
	handleRemove: (id: number | string) => void;
	onSubmitProduct: (data: Product) => void;
	getDetail: (id: number | string) => void;
};

export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

type ChirldrenProps = {
	children: React.ReactNode;
};

export const ProductProvider = ({ children }: ChirldrenProps) => {
	const [state, dispatch] = useReducer(productReducer, { products: [] });

	const nav = useNavigate();

	useEffect(() => {
		(async () => {
			const { data } = await instance.get(`/products`);
			dispatch({ type: "SET_PRODUCTS", payload: data });
		})();
	}, []);

	const handleRemove = async (id: number | string) => {
		if (confirm("Are you sure?")) {
			await instance.delete(`/products/${id}`);
			dispatch({ type: "REMOVE_PRODUCT", payload: id });
		}
	};

	const getDetail = async (id: number | string) => {
		const { data } = await instance.get(`/products/${id}`);
		dispatch({ type: "SET_SELECTED_PRODUCT", payload: data });
	};

	const onSubmitProduct = async (data: Product) => {
		try {
			if (data.id) {
				await instance.patch(`/products/${data.id}`, data);
				dispatch({ type: "UPDATE_PRODUCT", payload: data });
			} else {
				await instance.post("/products", data);
				dispatch({ type: "ADD_PRODUCT", payload: data });
			}
			nav("/admin");
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<ProductContext.Provider value={{ state, handleRemove, onSubmitProduct, getDetail }}>
			{children}
		</ProductContext.Provider>
	);
};
