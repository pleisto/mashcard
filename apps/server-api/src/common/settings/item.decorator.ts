import { ItemOptions, ITEM_OPTIONS_METADATA } from './settings.interface'

export function Item(options: ItemOptions): PropertyDecorator {
  /**
   * @nestjs/common#SetMetadata don't support PropertyDecorator.
   * so we use vanilla code here.
   */
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(ITEM_OPTIONS_METADATA, options, target, propertyKey)
  }
}
