// src/components/dialogs/ProductImportDialog.tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Papa from "papaparse";
import type { CreateProduct } from "@/features/products/types/products.types";
import { createProduct } from "@/features/products/repository/products.repository";

interface ImportDialogProps {
	children?: React.ReactNode;
	onFileUpload?: (file: File) => void;
	onImportSuccess?: () => void;
}

const ImportDialog = ({
	children,
	onFileUpload,
	onImportSuccess,
}: ImportDialogProps) => {
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0] ?? null;
		if (selectedFile) {
			setFile(selectedFile);
			onFileUpload?.(selectedFile);
		}
	};

	const handleImport = async () => {
		if (!file) return;

		setLoading(true);
		setError(null);

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: async (results) => {
				const rows = results.data as Record<string, string>[];

				try {
					for (const row of rows) {
						// Convierte CSV a CreateProduct
						const product: CreateProduct = {
							code: Number(row.code),
							name: row.name,
							price: Number(row.price),
						};
						await createProduct(product);
					}

					alert(`Importación completada: ${rows.length} productos`);
					onImportSuccess?.();
					setOpen(false);
					setFile(null);
				} catch (err) {
					setError("Error al importar productos. Revisa tu CSV.");
					console.error(err);
				} finally {
					setLoading(false);
				}
			},
			error: (err: Error) => {
				setError(`Error leyendo CSV: ${err.message}`);
				setLoading(false);
			},
		});
	};

	// code,name,price
	// 101,Hamburguesa,5.99
	// 102,Pizza,8.50
	// 103,Refresco,1.50

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className="max-w-md">
				<div className="mt-4 flex flex-col gap-4 items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded">
					<p className="text-sm text-gray-500">
						Arrastra un archivo CSV aquí o haz clic para seleccionar
					</p>
					<Input type="file" accept=".csv" onChange={handleFileChange} />
					{file && (
						<p className="text-green-600">Archivo seleccionado: {file.name}</p>
					)}
					{error && <p className="text-red-600">{error}</p>}
				</div>

				<Button
					className="mt-4"
					disabled={!file || loading}
					onClick={handleImport}
				>
					{loading ? "Importando..." : "Importar"}
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default ImportDialog;
