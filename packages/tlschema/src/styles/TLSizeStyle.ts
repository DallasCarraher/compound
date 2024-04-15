import { T } from '@cmpd/validate'
import { StyleProp } from './StyleProp'

/** @public */
export const DefaultSizeStyle = StyleProp.defineEnum('tldraw:size', {
	defaultValue: 'm',
	values: ['s', 'm', 'l', 'xl'],
})

/** @public */
export type TLDefaultSizeStyle = T.TypeOf<typeof DefaultSizeStyle>
