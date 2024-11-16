import React from 'react';
import { mobileNavigation } from '../contents/navigation';
import { NavLink } from 'react-router-dom';

const MobileNavigation = () => {
	return (
		<section className="lg:hidden h-14 bg-black  backdrop-blur-2xl bg-opacity-70 fixed bottom-0 w-full z-40">
			<div className="flex items-center justify-between h-full text-neutral-400">
				{mobileNavigation.map((nav, index) => {
					return (
						<NavLink
							to={nav.href}
							key={nav.label + 'mobilenavigation'}
							className={({ isActive }) =>
								`px-3 flex h-full items-center flex-col justify-center ${
									isActive && 'text-white'
								} `
							}>
							<div className="text-2xl">{nav.icon}</div>
							<p className="text-sm">{nav.label}</p>
						</NavLink>
					);
				})}
			</div>
		</section>
	);
};

export default MobileNavigation;
