# compound (apache tldraw)

## What is compound?

compound is a collaborative digital whiteboard available at [compound.com](https://compound.com). Its editor, user interface, and other underlying libraries are open source and available in this repository. They are also distributed on npm. You can use compound to create a drop-in whiteboard for your product or as the foundation on which to build your own infinite canvas applications.

Learn more at [compound.dev](https://compound.dev).

## Installation & Usage

To learn more about using compound in your React application, follow our guide [here](https://compound.dev/installation)

```tsx
import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'

export default function () {
	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw />
		</div>
	)
}
```

## Local development

To run the local development server, first clone this repo.

Install dependencies:

```bash
yarn
```

Start the local development server:

```bash
yarn dev
```

Open the example project at `localhost:5420`.

### Examples

Our development server contains several examples that demonstrates different ways that you can customize compound or use its APIs. Each example is found in the [**apps/examples**](https://github.com/DallasCarraher/compound/tree/osmain/apps/examples) folder.

- eg: `localhost:5420` for the basic example.
- eg: `localhost:5420/api` for the API example.

## About this repository

### Top-level layout

This repository's contents is divided across four primary sections:

- `/apps` contains the source for our applications
- `/packages` contains the source for our public packages
- `/scripts` contains scripts used for building and publishing
- `/assets` contains icons and translations relied on by the app
- `/docs` contains the content for our docs site at [compound.dev](https://compound.dev)

### Applications

- `examples`: our local development / examples project

### Packages

- `assets`: a library for working with compound's fonts and translations
- `editor`: the compound editor
- `state`: a signals library, also known as signia
- `store`: an in-memory reactive database
- `tldraw`: the main compound package containing both the editor and the UI
- `tlschema`: shape definitions and migrations
- `utils`: low-level data utilities shared by other libraries
- `validate`: a validation library used for run-time validation

## Community

Have questions, comments or feedback? [start a discussion](https://github.com/DallasCarraher/compound/discussions/new).

## Distributions

You can't find compound on npm yet.

At the moment compound is in pre-alpha.

## License

The source code for various apps and packages in this repository are licensed under Apache-2.0. These licenses are not subject to change.

## Contribution

Found a bug? Please [submit an issue](https://github.com/DallasCarraher/compound/issues/new).

