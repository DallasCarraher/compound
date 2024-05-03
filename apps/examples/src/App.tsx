import { FC } from 'react'
import { Link } from 'react-router-dom'

import { allExamples } from './examples'
import compound from './icons/compound.svg'

export const App: FC = () => {
	return (
		<main id="app" className="flex flex-col flex-1 gap-20">
			<section id="logo" className="flex flex-col items-center select-none">
				<img src={compound} alt="logo" draggable="false" style={{ height: 150, width: 150 }} />
				<h1 className="font-bold">Examples</h1>
			</section>
			<section id="compound-examples" className="flex flex-wrap gap-5 items-center justify-center">
				{allExamples
					.filter((example) => example.title)
					.map((example) => (
						<Link
							key={example.path}
							to={example.path}
							className="text-center items-center flex flex-col"
						>
							<div
								id={example.title}
								className="border-2 border-dotted hover:border-solid border-black h-32 w-32 flex flex-col items-center justify-center p-2"
							>
								{example.title}
								{/* Need illustrations or icons */}
								{/* <img
									src={`https://source.unsplash.com/200x200/?${example.title}`}
									alt={example.title}
									className="h-16 w-16"
								/> */}
							</div>
						</Link>
					))}
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
