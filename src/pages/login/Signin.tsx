import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormType } from "@/features/users/userSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/features/users/userSchema";

const SignIn = () => {
	const form = useForm<FormType>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	return (
		<div className="form-container">
			<Form {...form}>
				<form className="space-y-4">
					<div>
						<Label htmlFor="username">Nombre de Usuario</Label>
						<Input
							id="username"
							type="text"
							{...form.register("username", {
								onChange: () => form.clearErrors("root"),
							})}
						/>
					</div>
					<div>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							{...form.register("password", {
								onChange: () => form.clearErrors("root"),
							})}
						/>
					</div>
					<div>
						{form.formState.errors.root && (
							<p className="text-red-600 text-sm">
								{form.formState.errors.root.message}
							</p>
						)}
						<Button type="submit">Login</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default SignIn;
