# compound

**compound** is a fork of **tldraw** from the point at which it was still licensed under Apache 2.0.

The intention for this library simply put, is to continue to build upon the existing foundations and architecture, enhancing its capabilities where possible, but more importantly refining it further to provide a streamlined API and **primitive** for react applications in need of a whiteboarding component or interactive canvas.

The other mission of this library is to continue to offer a **completely free for commercial use tool**.

Compound's editor, user interface, and other underlying libraries are open source and available in this repository. They are also distributed on npm. You can use compound to create a drop-in whiteboard for your product or as the foundation on which to build your own canvas applications.

<hr />

## Contributing

If you want to contribute to the library please first read the [Contributing](https://github.com/DallasCarraher/compound/blob/osmain/CONTRIBUTING.md) doc.

Found a bug? Please [submit an issue](https://github.com/DallasCarraher/compound/issues/new).

## Local Development

To run the local development server, first clone this repo.

Install dependencies:

```bash
yarn
```

Start the local development server:

```bash
yarn dev
```

Open the example project at `localhost:8080`.

### Examples

The development server contains several examples that demonstrate different ways that you can customize compound or use its APIs. Each example is found in the [**apps/examples**](https://github.com/DallasCarraher/compound/tree/osmain/apps/examples) folder.

- eg: `localhost:8080` for the basic example.
- eg: `localhost:8080/api` for the API example.

<hr />

## About this repository

### Top-level layout

This repository's contents is divided across four primary sections:

- `/apps` contains the source for our applications
- `/packages` contains the source for our public packages
- `/scripts` contains scripts used for building and publishing
- `/assets` contains icons and translations relied on by the app
- `/docs` contains the content for our docs site at [compound.dev](https://compound.dev)

### Applications

- `examples`: local development / examples project

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

compound's pre-release packages can be found on npm: [@cmpd](https://www.npmjs.com/search?q=%40cmpd)

<hr />

## License

The source code for various apps and packages in this repository are licensed under Apache-2.0.
**These licenses are not subject to change.**
