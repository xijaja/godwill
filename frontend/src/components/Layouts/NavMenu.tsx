import { Icon } from '@iconify/react';
import { NavLink } from "react-router-dom";

type MenuList = {
	id: string;
	name: string;
	link: string;
	icon: string;
	subMenu?: {
		name: string;
		link: string;
	}[]
}[]

export default function NavMenu() {
	const menuList: MenuList = [
		{
			id: 'bu-dash-accordion',
			name: '仪表盘',
			link: '/dash',
			icon: 'material-symbols:android-google-home',
		},
		{
			id: 'bu-products-accordion',
			name: '产品管理',
			link: '/products',
			icon: 'ph:package-bold',
		},
		{
			id: 'bu-strategys-accordion',
			name: '策略管理',
			link: '/strategys',
			icon: 'ph:strategy-bold',
		},
		{
			id: 'bu-modelcard-accordion',
			name: '模型与评分卡',
			link: '/modelcard',
			icon: 'carbon:machine-learning-model',
			subMenu: [
				{
					name: '模型管理',
					link: '/modelcard/model',
				},
				{
					name: '评分卡管理',
					link: '/modelcard/scorecard',
				},
			]
		},
		{
			id: 'bu-users-accordion',
			name: '用户管理',
			link: '/users',
			icon: 'ph:users-three',
			subMenu: [
				{
					name: '用户列表',
					link: '/users/list',
				},
				{
					name: '用户组',
					link: '/users/group',
				},
			]
		}
	]


	return (
		<>
			<button type="button" className="text-gray-500 hover:text-gray-600 flex gap-1" data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation">
				<span className="sr-only">Toggle Navigation</span>
				<svg className="w-5 h-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
					<path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
				</svg>
				<span className="text-sm">菜单</span>
			</button>

			<div id="docs-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700">
				<div className="px-6 flex justify-between items-center">
					<button className="flex-none font-semibold dark:text-white" aria-label="Brand">
						<h1 className="text-xl">LOGO</h1>
					</button>
					<small>版本: 0.1</small>
				</div>
				<nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap">
					<ul className="space-y-1.5">
						{menuList.map((menum) => {
							return menum.subMenu ? (
								<li className="hs-accordion" id={menum.id} key={menum.id}>
									<button className={`hs-accordion-toggle ${menuButton} hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent dark:hs-accordion-active:text-white`}>
										<Icon icon={menum.icon} className="w-4 h-4"></Icon>
										{menum.name}
										<svg className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
										</svg>
										<svg className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
										</svg>
									</button>
									<div id={menum.id} className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
										<ul className="pt-2 pl-2">
											{menum.subMenu.map((sub, index) => {
												return (
													<li key={index}>
														<NavLink to={sub.link} className={({isActive}) => isActive ? `${subMenuButton} ${activeMenu}` : `${subMenuButton}`}>{sub.name}</NavLink>
													</li>
												)
											})}
										</ul>
									</div>
								</li>
							) : (
								<li key={menum.id}>
									<NavLink to={menum.link} className={({isActive}) => isActive ? `${menuButton} ${activeMenu}` : `${menuButton}`}>
										<Icon icon={menum.icon} className="w-4 h-4"></Icon>
										{menum.name}
									</NavLink>
								</li>
							)
						})}
					</ul>
				</nav>
			</div>
		</>
	)
}


const activeMenu = "bg-gray-100";
const menuButton = "flex w-full items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300";
const subMenuButton = "flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300";

