// src\features\registry\components\table\cells\CheckRow.tsx
import { Checkbox } from "@/components/ui/checkbox";
import type { Registry } from "@/features/registry/types/registry.types";
import type { CellContext, HeaderContext } from "@tanstack/react-table";

export function CheckHeader({ table }: HeaderContext<Registry, unknown>) {
	const checked =
		table.getIsAllPageRowsSelected() ||
		(table.getIsSomePageRowsSelected() && "indeterminate");

	return (
		<Checkbox
			checked={checked}
			onCheckedChange={(value) => {
				table.toggleAllPageRowsSelected(!!value);
			}}
			aria-label="Select all"
		/>
	);
}

export function CheckCell({ row }: CellContext<Registry, unknown>) {
	return (
		<Checkbox
			disabled={!row.getCanSelect()}
			checked={row.getIsSelected()}
			onCheckedChange={(value) => row.toggleSelected(!!value)}
			aria-label="Select row"
		/>
	);
}
