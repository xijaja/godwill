import React from 'react'
import NavMenu from '@components/Layouts/NavMenu.tsx'

type Props = {
	children: React.ReactNode
}

export default function Layout({children}: Props) {
	return (
		<>
			<NavMenu	/>
			<div className="px-4 mx-auto mt-4 lg:ml-[260px] lg:mt-0">
				{children}
			</div>
		</>
	)
}