// src/features/registry/components/RegistryOptions.tsx
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

interface Props {
	onSubmit: () => void;
	onDelete: () => void;
	disableDelete?: boolean;
}

const RegistryOptions = ({ onSubmit, onDelete, disableDelete }: Props) => {
	return (
		<ButtonGroup orientation="vertical" className="h-fit">
			<Button variant="outline" onClick={onDelete} disabled={disableDelete}>
				Borrar
			</Button>
			<Button onClick={onSubmit}>Enviar</Button>
		</ButtonGroup>
	);
};

export default RegistryOptions;
