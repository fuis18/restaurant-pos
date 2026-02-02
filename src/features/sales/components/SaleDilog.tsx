"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import type { SaleItem } from "@/features/sales/types/sales.types";

interface SaleDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	saleItems: SaleItem[] | null;
}

const SaleDialog = ({ open, onOpenChange, saleItems }: SaleDialogProps) => {
	const totalSale =
		saleItems?.reduce(
			(sum, item) => sum + item.price_at_sale * item.quantity,
			0,
		) ?? 0;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>Detalle de la venta</DialogTitle>
				</DialogHeader>

				{!saleItems ? (
					<p className="mt-2">Cargando...</p>
				) : (
					<Table className="mt-4">
						<TableHeader>
							<TableRow>
								<TableHead>Código</TableHead>
								<TableHead>Producto</TableHead>
								<TableHead>Cantidad</TableHead>
								<TableHead>Precio</TableHead>
								<TableHead>Total</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{saleItems.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.code}</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.quantity}</TableCell>
									<TableCell>${item.price_at_sale}</TableCell>
									<TableCell>
										S/.{(item.price_at_sale * item.quantity).toFixed(2)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableHeader>
							<TableRow>
								<TableCell colSpan={4} className="text-right font-semibold">
									Total venta
								</TableCell>
								<TableCell className="font-semibold">
									S/.{totalSale.toFixed(2)}
								</TableCell>
							</TableRow>
						</TableHeader>
					</Table>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default SaleDialog;
