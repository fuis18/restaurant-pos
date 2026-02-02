// src\features\registry\hooks\useSubmitRegistry.ts
import { EMPTY_REGISTRY_ROW } from "../types/constants";
import { submitRegistrySale } from "../service/registry.service";
import type { RegistryFocus } from "./useRegistryFocus";
import type { Registry } from "../types/registry.types";

interface Params {
	data: Registry[];
	total: number;
	setData: React.Dispatch<React.SetStateAction<Registry[]>>;
	focus: RegistryFocus;
}

export const useSubmitRegistry = ({ data, total, setData, focus }: Params) => {
	const submit = async () => {
		const success = await submitRegistrySale(data, total);

		if (!success) return;

		setData([EMPTY_REGISTRY_ROW]);
		focus.focusCell(0, "code");
	};

	return {
		submit,
	};
};
