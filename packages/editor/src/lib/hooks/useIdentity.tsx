import { areArraysShallowEqual, areObjectsShallowEqual } from '@cmpd/utils'
import { useRef } from 'react'

/**
 * This is a generic hook that takes a value and a comparison function as arguments.
 * It uses the useRef hook to store the previous value.
 * If the current value is equal to the previous value (as determined by the isEqual function),
 * it returns the previous value.
 * Otherwise, it updates the ref with the new value and returns the new value.
 */
function useIdentity<T>(value: T, isEqual: (a: T, b: T) => boolean): T {
	const ref = useRef(value)
	if (isEqual(value, ref.current)) {
		return ref.current
	}
	ref.current = value
	return value
}

/** @internal */
export function useShallowArrayIdentity<T>(arr: readonly T[]): readonly T[] {
	return useIdentity(arr, areArraysShallowEqual)
}

/** @internal */
export function useShallowObjectIdentity<T extends Record<string, unknown>>(arr: T): T {
	return useIdentity(arr, areObjectsShallowEqual)
}
