import type { Sale } from "@/features/sales/types/sales.types";
import type { CellContext } from "@tanstack/react-table";
import { toPeruDay } from "@/lib/date";

export default function DayCell({ row }: CellContext<Sale, unknown>) {
	return <span>{toPeruDay(row.original.date)}</span>;
}
