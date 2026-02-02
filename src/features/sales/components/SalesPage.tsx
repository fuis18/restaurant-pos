import SalesFilter from "@/features/sales/components/SalesFilter";
import { useSales } from "../hooks/useSales";
import SalesTable from "@/features/sales/components/SalesTable";
import SaleDialog from "@/features/sales/components/SaleDilog";
import PagTable from "@/components/PaginationTable";
import { columns } from "./table/sales-columns";

export const SalesPage = () => {
	const {
		sales,
		page,
		setPage,
		totalPages,
		dialogOpen,
		closeDialog,
		openSaleDetail,
		selectedSaleItems,
		selectedDate,
		setSelectedDate,
	} = useSales();

	return (
		<main>
			<SalesFilter
				setPage={setPage}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>

			<SalesTable data={sales} columns={columns} onRowClick={openSaleDetail} />

			<SaleDialog
				open={dialogOpen}
				onOpenChange={closeDialog}
				saleItems={selectedSaleItems}
			/>

			<PagTable page={page} setPage={setPage} totalPages={totalPages} />
		</main>
	);
};
