import { getAssetUrlsByMetaUrl } from '@cmpd/assets/urls'
import {
	DefaultErrorFallback,
	ErrorBoundary,
	setDefaultEditorAssetUrls,
	setDefaultUiAssetUrls,
} from '@cmpd/compound'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Header } from './Header'
import { allExamples } from './examples'

// we use secret internal `setDefaultAssetUrls` functions to set these at the
// top-level so assets don't need to be passed down in every single example.
const assetUrls = getAssetUrlsByMetaUrl()
setDefaultEditorAssetUrls(assetUrls)
setDefaultUiAssetUrls(assetUrls)

const router = createBrowserRouter([
	{
		path: '/',
		element: <Header />,
		children: [{ path: '/', element: <App /> }, ...allExamples],
	},
])

document.addEventListener('DOMContentLoaded', () => {
	const rootElement = document.getElementById('root')!
	const root = createRoot(rootElement!)
	root.render(
		<StrictMode>
			<ErrorBoundary
				fallback={(error) => <DefaultErrorFallback error={error} />}
				onError={(error) => console.error(error)}
			>
				<RouterProvider router={router} />
			</ErrorBoundary>
		</StrictMode>
	)
})
