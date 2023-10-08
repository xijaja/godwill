import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashPage from '@pages/Dash.tsx'
import HomePage from '@pages/Home.tsx'
import AboutPage from '@pages/About.tsx'
import ProductsPage from '@pages/Products.tsx'
import StrategyPage from '@pages/strategys/StrategyType.tsx'
import FlowPage from '@pages/flows/FlowID.tsx'
import TodoPage from '@pages/Todo.tsx'

export default function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/dash" element={<DashPage />} />
					<Route path="/products" element={<ProductsPage />}/>
					<Route path="/strategys" element={<StrategyPage />}/>
					<Route path="/flows/:flowID" element={<FlowPage />}/>
					<Route path="/about" element={<AboutPage />}/>
					<Route path="/*" element={<TodoPage />}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}