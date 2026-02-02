import * as repo from "../repository/products.repository";

export const productService = {
	async findByCode(code: number) {
		return repo.getProductByCode(code);
	},

	async searchByLike(name: string) {
		if (!name.trim()) return [];
		return repo.getProductByLike(name);
	},

	async findByName(name: string) {
		return repo.getProductByName(name);
	},

	async getPaginated(limit: number, offset: number) {
		return repo.getAllProducts(limit, offset);
	},

	async count() {
		return repo.getProductsCount();
	},
};
