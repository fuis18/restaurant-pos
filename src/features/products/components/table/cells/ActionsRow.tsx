import ProductDialog from "@/features/products/components/ProductDialog";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Product } from "@/features/products/types/products.types";
import type { CellContext } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export default function ActionsCell({ row }: CellContext<Product, unknown>) {
	const product = row.original;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				{product.state ? (
					<ButtonGroup
						orientation="vertical"
						aria-label="Media controls"
						className="h-fit w-full"
					>
						<ProductDialog
							product={product}
							// onSuccess={() => onEdit?.(product.id)}
						>
							<Button variant="ghost" className="w-full justify-start">
								Editar
							</Button>
						</ProductDialog>

						<DropdownMenuItem
							variant="destructive"
							className="text-sm font-medium cursor-pointer px-4"
							// onClick={() => onDelete?.(product.id)}
						>
							Eliminar
						</DropdownMenuItem>
					</ButtonGroup>
				) : (
					<DropdownMenuItem
						// onClick={() => onReactivate?.(product.id)}
						className="text-green-600 font-medium"
					>
						Reactivar
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
