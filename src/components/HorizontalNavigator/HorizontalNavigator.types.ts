import { ChayaColorType } from '../../utils/classMaps/colors';

import { HorizontalNavigatorItemType, HorizontalNavigatorVariantType } from './HorizontalNavigatorItem.types';

export type HorizontalNavigatorProps = {
  /** id of the navigator */
  id?: string,
  /**  className for the navigator */
  className?: string,
  /**  className for each item */
  itemClassName?: string,
  /**  items to be rendered in the navigator */
  items: HorizontalNavigatorItemType[],
  /**  key of the active item. If null, no item will be active. */
  activeItem?: string | null,
  /**  variant of the navigator. Can be 'pill', 'boxed' or 'line', defaults to 'pill' */
  variant?: HorizontalNavigatorVariantType,
  /**  color of the navigator. */
  color?: ChayaColorType,
  /**  callback when an item is clicked. Passes the key and the item as arguments. */
  onClickItem?: (key: string, item: HorizontalNavigatorItemType) => void,
};