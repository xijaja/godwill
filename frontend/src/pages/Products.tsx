import Layout from '@components/Layouts/Layout.tsx'
import {useMemo, useState} from 'react'
import {doFetch} from '@lib/dofetch.ts'
import ProductCard, {type Product} from '@components/ProductCard.tsx'


const getProducts = async () => {
	const resp = await doFetch({
		api: '/v1/product/info',
		method: 'POST',
		body: {}
	})
	return resp.data.products
}

export default function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([])

	useMemo(async () => {
		setProducts(await getProducts())
	}, []).then(r => r);

	return (
		<>
			<Layout>
				{products && products.map((product: Product, index) => (<ProductCard key={index} {...product} />))}
			</Layout>
		</>
	)
}