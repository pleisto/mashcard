import { ItemOptions, ITEM_OPTIONS_METADATA } from './settings.interface'

/**
 * Decorator for declaring config map item.
 * Item is a field of config map, that defines metadata about item.
 */
export function Item(options: ItemOptions): PropertyDecorator {
  /**
   * @nestjs/common#SetMetadata don't support PropertyDecorator.
   * so we use vanilla code here.
   */
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(ITEM_OPTIONS_METADATA, options, target, propertyKey)
  }
}
