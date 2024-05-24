import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { BookText, GitMerge } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useIsMobile from './hooks/useIsMobile'
import compound from './icons/compound.svg'

export const Header = () => {
	const location = useLocation()
	const isMobile = useIsMobile()

	return (
		<div id="compound-examples" className="flex-1 flex flex-col overflow-hidden">
			<div className="flex h-10 max-h-10 items-center justify-between">
				<Breadcrumb>
					<BreadcrumbList className="overflow-hidden text-ellipsis whitespace-nowrap flex-nowrap">
						<BreadcrumbItem>
							<Link
								to="#"
								className="flex items-center gap-2"
								onClick={() =>
									alert(
										'this will go somewhere soon :) \n Click "examples" to go back to the examples list'
									)
								}
							>
								<img src={compound} alt="logo" draggable="false" className="h-8 w-8" />
								<h1>compound</h1>
							</Link>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<Link to="/">
								<h1>examples</h1>
							</Link>
						</BreadcrumbItem>
						{location.pathname !== '/' && (
							<>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									{location.pathname
										.split('')
										.filter((s) => s !== '/')
										.join('')}
								</BreadcrumbItem>
							</>
						)}
					</BreadcrumbList>
				</Breadcrumb>
				{!isMobile && (
					<div className="flex gap-3 p-1">
						<a
							href="https://docs.cmpd.space"
							target="_blank"
							rel="noreferrer noopener"
							className="flex items-center gap-2 rounded p-1"
						>
							docs
							<BookText size={20} />
						</a>
						<a
							href="https://github.com/DallasCarraher/compound"
							target="_blank"
							rel="noreferrer noopener"
							className="flex items-center gap-2 rounded p-1"
						>
							src
							<GitMerge size={20} />
						</a>
					</div>
				)}
			</div>
			<Outlet />
		</div>
	)
}
