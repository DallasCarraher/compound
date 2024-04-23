/* eslint-disable @typescript-eslint/no-var-requires */
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Heading from '@theme/Heading'
import Layout from '@theme/Layout'
import clsx from 'clsx'

import styles from './index.module.css'

// type FeatureItem = {
// 	title: string
// 	Svg: React.ComponentType<React.ComponentProps<'svg'>>
// 	description: React.ReactNode
// }

// const FeatureList: FeatureItem[] = [
// 	{
// 		title: 'Easy to Use',
// 		Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
// 		description: (
// 			<>
// 				Compound's intention is to provide a simple, yet powerful, primitive for building canvas
// 				applications.
// 			</>
// 		),
// 	},
// 	// {
// 	// 	title: 'Focus on What Matters',
// 	// 	Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
// 	// 	description: (
// 	// 		<>
// 	// 			Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go ahead and move your
// 	// 			docs into the <code>docs</code> directory.
// 	// 		</>
// 	// 	),
// 	// },
// 	// {
// 	// 	title: 'Powered by React',
// 	// 	Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
// 	// 	description: (
// 	// 		<>
// 	// 			Extend or customize your website layout by reusing React. Docusaurus can be extended while
// 	// 			reusing the same header and footer.
// 	// 		</>
// 	// 	),
// 	// },
// ]

export default function Home() {
	const { siteConfig } = useDocusaurusContext()
	return (
		<Layout title="Home" description="A powerful primitive for building canvas applications">
			<header className={clsx('hero hero--primary', styles.heroBanner)}>
				<video
					autoPlay
					loop
					muted
					playsInline
					style={{
						position: 'absolute',
						width: '100%',
						left: '50%',
						top: '50%',
						height: '100%',
						objectFit: 'cover',
						transform: 'translate(-50%, -50%)',
						zIndex: '-1',
					}}
				>
					<source src="/b_roll.mp4" type="video/mp4" />
				</video>
				<div className="container">
					<Heading as="h1" className="hero__title" style={{ color: 'black' }}>
						{siteConfig.title}
					</Heading>
					<p className="hero__subtitle" style={{ color: 'black' }}>
						{siteConfig.tagline}
					</p>
					<div className={styles.buttons}>
						<Link className="button button--secondary button--lg" to="/docs/GetStarted">
							Get Started
						</Link>
					</div>
				</div>
			</header>
			{/* <main>
				<section className={styles.features}>
					<div className="container">
						<div className="row">
							{FeatureList.map(({ title, Svg, description }: FeatureItem, idx) => (
								<div key={idx} className={clsx('col col--12')}>
									<div className="text--center">
										<Svg className={styles.featureSvg} role="img" />
									</div>
									<div className="text--center padding-horiz--md">
										<Heading as="h3">{title}</Heading>
										<p>{description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</main> */}
		</Layout>
	)
}
