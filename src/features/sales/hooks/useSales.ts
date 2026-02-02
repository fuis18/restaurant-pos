// src/features/sales/useSales.ts
import { useEffect, useState } from "react";
import { CONFIG } from "@/constants/config";
import {
	getAllSales,
	getSaleItems,
	getSalesCount,
} from "@/features/sales/repository/sales.repository";
import type { Sale, SaleItem } from "@/features/sales/types/sales.types";
import { usePagination } from "@/hooks/usePagination";

export function useSales() {
	// --------------------
	// DATA
	// --------------------
	const [sales, setSales] = useState<Sale[]>([]);
	const [selectedSaleItems, setSelectedSaleItems] = useState<SaleItem[] | null>(
		null,
	);

	// --------------------
	// PAGINATION
	// --------------------
	const [totalPages, setTotalPages] = useState(1);
	const { page, setPage } = usePagination(totalPages);

	const limit = CONFIG.LIMIT;
	const offset = (page - 1) * limit;

	// --------------------
	// FILTERS
	// --------------------
	const [selectedDate, setSelectedDate] = useState<{
		from?: string;
		to?: string;
	}>();

	// --------------------
	// DIALOG
	// --------------------
	const [dialogOpen, setDialogOpen] = useState(false);

	const closeDialog = () => {
		setDialogOpen(false);
		setSelectedSaleItems(null);
	};

	const openSaleDetail = async (saleId: number) => {
		setDialogOpen(true);
		setSelectedSaleItems(null); // loading state

		const items = await getSaleItems(saleId);
		setSelectedSaleItems(items);
	};

	// --------------------
	// EFFECTS
	// --------------------
	useEffect(() => {
		const fetchSales = async () => {
			const [salesData, total] = await Promise.all([
				getAllSales(limit, offset, selectedDate),
				getSalesCount(selectedDate),
			]);

			setSales(salesData);
			setTotalPages(Math.ceil(total / limit));
		};

		void fetchSales();
	}, [limit, offset, selectedDate]);

	return {
		// data
		sales,

		// pagination
		page,
		setPage,
		totalPages,

		// filters
		selectedDate,
		setSelectedDate,

		// dialog
		dialogOpen,
		openSaleDetail,
		closeDialog,
		selectedSaleItems,
	};
}
