import Development from '../Development'
import APIExample from './APIExample'
import AssetPropsExample from './AssetOptionsExample'
import CanvasEventsExample from './CanvasEventsExample'
import CustomConfigExample from './CustomConfigExample/CustomConfigExample'
import CustomStylesExample from './CustomStylesExample/CustomStylesExample'
import CustomUiExample from './CustomUiExample/CustomUiExample'
import ErrorBoundaryExample from './ErrorBoundaryExample/ErrorBoundaryExample'
import ExternalContentSourcesExample from './ExternalContentSourcesExample'
import ForceMobileExample from './ForceBreakpointExample'
import HideUiExample from './HideUiExample'
import HostedImagesExample from './HostedImagesExample'
import MetaExample from './MetaExample'
import MultipleExample from './MultipleExample'
import OnTheCanvasExample from './OnTheCanvas'
import PersistenceExample from './PersistenceExample'
import ReadOnlyExample from './ReadOnlyExample'
import ScreenshotToolExample from './ScreenshotToolExample/ScreenshotToolExample'
import ScrollExample from './ScrollExample'
import ShapeMetaExample from './ShapeMetaExample'
import SnapshotExample from './SnapshotExample/SnapshotExample'
import StoreEventsExample from './StoreEventsExample'
import UiEventsExample from './UiEventsExample'
import UserPresenceExample from './UserPresenceExample'
import ZonesExample from './ZonesExample'
import EndToEnd from './end-to-end/end-to-end'
import OnlyEditorExample from './only-editor/OnlyEditor'

type Example = {
	path: string
	title?: string
	element: JSX.Element
}

export const allExamples: Example[] = [
	{
		// title: 'Development',
		path: 'development',
		element: <Development />,
	},
	// {
	// 	title: 'Collaboration (with Yjs)',
	// 	path: 'yjs',
	// 	element: <YjsExample />,
	// },
	{
		title: 'Using the Editor API',
		path: 'editor-api',
		element: <APIExample />,
	},
	{
		title: 'Using the "Meta" property',
		path: 'meta',
		element: <MetaExample />,
	},
	{
		title: 'Typing "Meta"',
		path: 'meta-shape',
		element: <ShapeMetaExample />,
	},
	{
		title: 'Multi-Editor',
		path: 'multi-editor',
		element: <MultipleExample />,
	},
	{
		title: 'Readonly Example',
		path: 'read-only',
		element: <ReadOnlyExample />,
	},
	{
		title: 'Things on the canvas',
		path: 'things-on-the-canvas',
		element: <OnTheCanvasExample />,
	},
	{
		title: 'Scrolling',
		path: 'scrolling',
		element: <ScrollExample />,
	},
	{
		title: 'Custom shapes & tools',
		path: 'custom-shapes-&-tools',
		element: <CustomConfigExample />,
	},
	// {
	// 	title: 'Sublibraries',
	// 	path: 'exploded',
	// 	element: <ExplodedExample />,
	// },
	{
		title: 'Error boundary',
		path: 'error-boundary',
		element: <ErrorBoundaryExample />,
	},
	{
		title: 'Custom UI',
		path: 'custom-ui',
		element: <CustomUiExample />,
	},
	{
		title: 'Custom Tool (Screenshot)',
		path: 'screenshot-tool',
		element: <ScreenshotToolExample />,
	},
	{
		title: 'Hide UI',
		path: 'hide-ui',
		element: <HideUiExample />,
	},
	// {
	// 	title: 'UI components',
	// 	path: 'custom-components',
	// 	element: <CustomComponentsExample />,
	// },
	{
		title: 'UI events',
		path: 'ui-events',
		element: <UiEventsExample />,
	},
	{
		title: 'Canvas events',
		path: 'canvas-events',
		element: <CanvasEventsExample />,
	},
	{
		title: 'Store events',
		path: 'store-events',
		element: <StoreEventsExample />,
	},
	{
		title: 'User presence',
		path: 'user-presence',
		element: <UserPresenceExample />,
	},
	{
		title: 'UI zones',
		path: 'zones',
		element: <ZonesExample />,
	},
	{
		title: 'Persistence',
		path: 'persistence',
		element: <PersistenceExample />,
	},
	{
		title: 'Snapshots',
		path: 'snapshots',
		element: <SnapshotExample />,
	},
	{
		title: 'Hosted Images',
		path: 'hosted-images',
		element: <HostedImagesExample />,
	},
	{
		title: 'Force mobile breakpoint',
		path: 'force-mobile',
		element: <ForceMobileExample />,
	},
	{
		title: 'Custom styles',
		path: 'custom-styles',
		element: <CustomStylesExample />,
	},

	{
		title: 'Only editor',
		path: 'only-editor',
		element: <OnlyEditorExample />,
	},
	{
		title: 'Asset props',
		path: 'asset-props',
		element: <AssetPropsExample />,
	},
	// {
	// 	title: 'Floaty window',
	// 	path: 'floaty-window',
	// 	element: <FloatyExample />,
	// },
	{
		title: 'External content sources',
		path: 'external-content-sources',
		element: <ExternalContentSourcesExample />,
	},
	// not listed
	{
		path: 'end-to-end',
		element: <EndToEnd />,
	},
]
