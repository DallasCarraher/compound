import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link, Outlet, useLocation } from 'react-router-dom'
import compound from '/compound.svg'

export const Header = () => {
	const location = useLocation()

	return (
		<div id="compound-examples" className="flex-1 flex flex-col overflow-hidden">
			<div className="flex h-10 max-h-10 items-center justify-between">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<Link to="#" className="flex items-center gap-2">
								<img src={compound} alt="logo" draggable="false" className="h-8 w-8" />
								<h1>compound</h1>
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
				{/* <div className="flex gap-3 p-1">
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
				</div> */}
			</div>
			<Outlet />
		</div>
	)
}
