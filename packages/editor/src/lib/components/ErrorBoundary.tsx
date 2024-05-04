import { Component, ErrorInfo, Fragment, ReactNode } from 'react'
import { ErrorFallbackComponent } from './default-components/DefaultErrorFallback'

/** @public */
export interface ErrorBoundaryProps {
	children: ReactNode
	onError?: ((error: unknown) => void) | null
	fallback: (props: { error: Error | null }) => React.ReactNode
}

interface State {
	error: Error | null
}

/** @public */
export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
	public state: State = {
		error: null,
	}

	public static getDerivedStateFromError(error: Error): State {
		return { error }
	}

	public componentDidCatch(error: unknown, _errorInfo: ErrorInfo) {
		this.props.onError?.(error)
	}

	public render() {
		if (this.state.error && this.props.fallback)
			return this.props.fallback({ error: this.state.error })

		return <Fragment>{this.props.children}</Fragment>
	}
}

/** @internal */
export function OptionalErrorBoundary({
	children,
	fallback,
	...props
}: Omit<ErrorBoundaryProps, 'fallback'> & {
	fallback: ErrorFallbackComponent
}) {
	if (fallback === null) {
		return <>{children}</>
	}

	return (
		<ErrorBoundary fallback={fallback} {...props}>
			{children}
		</ErrorBoundary>
	)
}
