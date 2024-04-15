import { T } from '@cmpd/validate'
import { StyleProp } from './StyleProp'

/** @public */
export const DefaultVerticalAlignStyle = StyleProp.defineEnum('tldraw:verticalAlign', {
	defaultValue: 'middle',
	values: ['start', 'middle', 'end'],
})

/** @public */
export type TLDefaultVerticalAlignStyle = T.TypeOf<typeof DefaultVerticalAlignStyle>
