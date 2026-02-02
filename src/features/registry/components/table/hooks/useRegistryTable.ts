import {
	useReactTable,
	getCoreRowModel,
	type RowSelectionState,
	type TableMeta,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { Registry } from "../../../types/registry.types";
import { columns } from "../registry-columns";

interface Params {
	data: Registry[];
	meta?: TableMeta<Registry>;
	onSelectionChange?: (rows: Registry[]) => void;
}

const useRegistryTable = ({ data, meta, onSelectionChange }: Params) => {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns,
		meta,
		state: { rowSelection },
		onRowSelectionChange: setRowSelection,
		getRowId: (row) => String(row.id),
		enableRowSelection: (row) => row.original.id !== data.length - 1,
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => {
		setRowSelection({});
	}, [data]);

	useEffect(() => {
		if (!onSelectionChange) return;

		onSelectionChange(
			table.getSelectedRowModel().rows.map((row) => row.original),
		);
	}, [onSelectionChange, rowSelection, table]);

	return table;
};

export default useRegistryTable;
