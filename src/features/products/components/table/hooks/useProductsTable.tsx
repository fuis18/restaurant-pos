import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../products-columns";
import type { Product } from "@/features/products/types/products.types";

interface Params {
	data: Product[];
}

const useProductsTable = ({ data }: Params) => {
	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return table;
};

export default useProductsTable;
