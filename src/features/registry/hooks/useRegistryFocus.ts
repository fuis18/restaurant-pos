// src/features/registry/hooks/useRegistryFocus.ts
import { useCallback, useState } from "react";
import type { FocusColumn, FocusTarget } from "../types/focus.types";

export interface RegistryFocus {
	focus: FocusTarget | null;
	focusCell: (rowIndex: number, column: FocusColumn) => void;
	clearFocus: () => void;
}

const useRegistryFocus = (): RegistryFocus => {
	const [focus, setFocus] = useState<FocusTarget | null>({
		rowIndex: 0,
		column: "code",
	});

	const focusCell = useCallback((rowIndex: number, column: FocusColumn) => {
		setFocus({ rowIndex, column });
	}, []);

	const clearFocus = () => setFocus(null);

	return {
		focus,
		focusCell,
		clearFocus,
	};
};
export default useRegistryFocus;
