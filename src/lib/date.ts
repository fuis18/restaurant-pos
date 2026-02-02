export function toPeruDay(date: string | Date): string {
	const d = typeof date === "string" ? new Date(date + "Z") : date;

	return d.toLocaleDateString("en-CA", {
		timeZone: "America/Lima",
	});
}
