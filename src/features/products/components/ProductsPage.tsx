import PagTable from "@/components/PaginationTable";
import useProducts from "../hooks/useProducts";
import ProductsTable from "./ProductsTable";
import ProductsOptions from "./ProductsOptions";

export const ProductsPage = () => {
	const { products, page, setPage, totalPages, reload } = useProducts();

	return (
		<main className="ProductsPage-container">
			<div>
				<ProductsTable data={products} />
				<PagTable page={page} setPage={setPage} totalPages={totalPages} />
			</div>
			<ProductsOptions loadProducts={reload} />
		</main>
	);
};
