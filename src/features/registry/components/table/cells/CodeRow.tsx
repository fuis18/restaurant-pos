// src/features/registry/components/table/CodeRow.tsx
import { Input } from "@/components/ui/input";
import { getProductByCode } from "@/features/products/repository/products.repository";
import type { Registry } from "@/features/registry/types/registry.types";
import type { CellContext } from "@tanstack/react-table";
import useFocusableCell from "../hooks/useFocusableCell";

export default function CodeCell({
	row,
	table,
	getValue,
}: CellContext<Registry, unknown>) {
	const meta = table.options.meta;
	const value = (getValue() as string) ?? "";

	const ref = useFocusableCell({
		rowIndex: row.index,
		column: "code",
		focus: meta?.focus?.focus ?? null,
	});

	return (
		<Input
			value={value}
			ref={ref}
			onChange={(e) => {
				meta?.updateCell?.(row.index, "code", e.target.value);
			}}
			onKeyDown={async (e) => {
				if (e.key === "Enter") e.preventDefault();

				if (e.key === "Enter" || e.key === "Tab") {
					const code = Number((e.target as HTMLInputElement).value);
					if (Number.isNaN(code)) return;

					const product = await getProductByCode(code);

					if (!product) return;

					// meta?.updateRow?.(row.index, {
					// 	product_id: product.id,
					// 	code: String(product.code),
					// 	name: product.name,
					// 	price: product.price,
					// 	quantity: 1,
					// 	total: product.price,
					// });

					meta?.upsertProduct?.(row.index, product, e.key === "Enter");

					// if (e.key === "Enter") meta?.addRow?.();
				}
			}}
		/>
	);
}
