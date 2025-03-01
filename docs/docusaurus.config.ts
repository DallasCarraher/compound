import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes as prismThemes } from 'prism-react-renderer'

const config: Config = {
	title: 'Compound',
	tagline: 'A powerful primitive for building canvas applications',
	favicon: 'img/compound.svg',

	// Set the production url of your site here
	url: 'https://docs.cmpd.space',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// // GitHub pages deployment config.
	// // If you aren't using GitHub pages, you don't need these.
	// organizationName: 'DallasCarraher', // Usually your GitHub org/user name.
	// projectName: 'compound', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: 'https://github.com/DallasCarraher/compound/tree/osmain/docs/',
				},
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: 'https://github.com/DallasCarraher/compound/tree/osmain/blog/',
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: 'img/docusaurus-social-card.jpg',
		navbar: {
			title: 'Compound',
			logo: {
				alt: 'Compound Logo',
				src: 'img/compound.svg',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'howToStart',
					position: 'left',
					label: 'Get Started',
				},
				// { to: '/blog', label: 'Blog', position: 'right' },
				{
					href: 'https://github.com/DallasCarraher/compound',
					position: 'right',
					className: 'header-github-link',
					'aria-label': 'GitHub repository',
				},
			],
		},
		footer: {
			style: 'light',
			links: [
				// {
				// 	title: 'Docs',
				// 	items: [
				// 		{
				// 			label: 'Tutorial',
				// 			to: '/docs/intro',
				// 		},
				// 	],
				// },
				// {
				// 	title: 'Community',
				// 	items: [
				// 		{
				// 			label: 'Stack Overflow',
				// 			href: 'https://stackoverflow.com/questions/tagged/docusaurus',
				// 		},
				// 		{
				// 			label: 'Discord',
				// 			href: 'https://discordapp.com/invite/docusaurus',
				// 		},
				// 		{
				// 			label: 'Twitter',
				// 			href: 'https://twitter.com/docusaurus',
				// 		},
				// 	],
				// },
				// {
				// 	title: 'Links',
				// 	items: [
				// 		// {
				// 		// 	label: 'Blog',
				// 		// 	to: '/blog',
				// 		// },
				// 		{
				// 			label: 'GitHub',
				// 			href: 'https://github.com/DallasCarraher/compound',
				// 		},
				// 	],
				// },
			],
			copyright: `Copyright © ${new Date().getFullYear()} Compound`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
}

export default config
