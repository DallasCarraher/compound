import { FC } from 'react'

import compound from '/compound.svg'

export const App: FC = () => {
	return (
		<main id="app" className="flex flex-col flex-1 gap-20">
			<section id="logo" className="flex flex-col items-center select-none">
				<img src={compound} alt="logo" draggable="false" style={{ height: 150, width: 150 }} />
				<h1 className="font-bold">Compound</h1>
			</section>
			<footer className="flex flex-1 flex-col justify-end self-center">
				<p>
					&copy;
					{new Date().getFullYear()} Compound
				</p>
			</footer>
		</main>
	)
}
