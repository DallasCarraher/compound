<!-- <div alt style="text-align: center; transform: scale(.5);">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="https://github.com/tldraw/tldraw/raw/main/assets/github-hero-dark.png" />
		<img alt="tldraw" src="https://github.com/tldraw/tldraw/raw/main/assets/github-hero-light.png" />
	</picture>
</div> -->

# @cmpd/compound

This is the pre-release version of [compound](https://github.com/DallasCarraher/compound).

In short, compound is a fork of @tldraw from the point at which it was still licensed under Apache 2.0. The intention for this library is to continue to build upon a more refined primitive of the original library.

## Installation

```bash
yarn add @cmpd/compound | npm install @cmpd/compound
```

Then start the local development server.

```bash
yarn dev | npm run dev
```

## Usage

An extremely minimal usage (without props) would look like this:

```tsx
import { Compound } from '@cmpd/compound'
import '@cmpd/compound/compound.css'

export default function App() {
	return (
		<div style={{
			position: fixed;
			inset: 0px;
			overflow: hidden;
		}}>
			<Compound />
		</div>
	)
}
```

See the [examples folder](https://github.com/DallasCarraher/compound/tree/osmain/apps/examples) for more examples.

## License

The source code in this repository is licensed under Apache-2.0.
