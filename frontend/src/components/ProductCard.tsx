export interface Product {
	id: string;
	name: string;
	desc: string;
	admission_strategy: string; // 准入策略
	grant_credit_strategy: string; // 授信策略
	use_credit_strategy: string; // 用信策略
	price_adjust_strategy: string; // 调价策略
	quota_adjust_strategy: string; // 调额策略
	collection_strategy: string; // 催收策略
	created_at: string;
	updated_at: string;
}

export default function ProductCard(product: Product) {
	return (
		<div key={product.id} className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
			<div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-gray-700">
				<div className="mt-1 text-sm text-gray-500 dark:text-gray-500">
					<h2 className="text-lg">{product.name}</h2>
					<small>{product.desc}</small>
				</div>
			</div>
			<div className="p-4 md:p-5 flex justify-between">
				<div>
					<h3 className="text-lg font-bold text-gray-800 dark:text-white">贷前管理</h3>
					<p className="mt-2 text-gray-800 dark:text-gray-400">准入策略：1234567890
						<a href="/flows/1234567890" target="_blank" className="text-blue-500">编辑</a>
						更换
					</p>
					<p className="mt-2 text-gray-800 dark:text-gray-400">授信策略：1234567890 编辑 更换</p>
				</div>
				<div>
					<h3 className="text-lg font-bold text-gray-800 dark:text-white">贷中管理</h3>
					<p className="mt-2 text-gray-800 dark:text-gray-400">用信策略：1234567890 编辑 更换</p>
					<p className="mt-2 text-gray-800 dark:text-gray-400">调额策略：1234567890 编辑 更换</p>
					<p className="mt-2 text-gray-800 dark:text-gray-400">调价策略：1234567890 编辑 更换</p>
				</div>
				<div>
					<h3 className="text-lg font-bold text-gray-800 dark:text-white">贷后管理</h3>
					<p className="mt-2 text-gray-800 dark:text-gray-400">催收策略：1234567890 编辑 更换</p>
				</div>
			</div>
		</div>
	)
}