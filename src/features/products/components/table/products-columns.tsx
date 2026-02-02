import type { Product } from "@/features/products/types/products.types";
import type { ColumnDef } from "@tanstack/react-table";
import ActionsCell from "./cells/ActionsRow";
import StateCell from "./cells/StateRow";

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "code",
		header: "Code",
	},
	{
		accessorKey: "name",
		header: "Nombre",
	},
	{
		accessorKey: "price",
		header: "Precio",
		cell: ({ row }) => (
			<span className="font-semibold">S/.{row.original.price}</span>
		),
	},
	{
		accessorKey: "active",
		header: "Estado",
		cell: StateCell,
	},
	{
		accessorKey: "Actions",
		header: "Acciones",
		cell: ActionsCell,
	},
];
