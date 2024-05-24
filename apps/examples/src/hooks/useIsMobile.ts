import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = '(max-width: 768px)'

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(window.matchMedia(MOBILE_BREAKPOINT).matches)

	useEffect(() => {
		const mediaQueryList = window.matchMedia(MOBILE_BREAKPOINT)
		const documentChangeHandler = () => setIsMobile(mediaQueryList.matches)

		mediaQueryList.addEventListener('change', documentChangeHandler)

		return () => {
			mediaQueryList.removeEventListener('change', documentChangeHandler)
		}
	}, [])

	return isMobile
}

export default useIsMobile
