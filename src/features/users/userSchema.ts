import z from "zod";

export const userSchema = z.object({
	username: z
		.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
		.max(20, "El nombre de usuario no puede superar los 20 caracteres"),
	password: z
		.string()
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.max(20, "La contraseña no puede superar los 20 caracteres"),
});
