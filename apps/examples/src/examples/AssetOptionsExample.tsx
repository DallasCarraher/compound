import { Compound } from '@cmpd/compound'
import '@cmpd/compound/compound.css'

export default function AssetPropsExample() {
	return (
		<div className="tldraw__editor">
			<Compound
				// only allow jpegs
				acceptedImageMimeTypes={['image/jpeg']}
				// don't allow any images
				acceptedVideoMimeTypes={[]}
				// accept images of any dimension
				maxImageDimension={Infinity}
				// ...but only accept assets up to 1mb
				maxAssetSize={1 * 1024 * 1024}
			/>
		</div>
	)
}
