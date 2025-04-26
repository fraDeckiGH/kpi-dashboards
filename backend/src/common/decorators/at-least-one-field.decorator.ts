import { 
	registerDecorator, 
	ValidationOptions, 
	ValidationArguments, 
} from 'class-validator'

/** ensures at least one of the specified fields is provided.
 * supports nested fields using dot notation (eg 'sentiment.favorite')
 */
export function AtLeastOneField(fields: string[], validationOptions?: ValidationOptions) {
	// return function (object: Object, propertyName: string) {
  return function (constructor: Function) {
		registerDecorator({
			name: 'atLeastOneField',
			target: /* object. */constructor,
			
      // propertyName,
			propertyName: "", // dummy(=unlikely to be used) prop
      
      // constraints: [property],
			options: validationOptions,
			validator: {
				validate(_: any, args: ValidationArguments) {
					const obj = args.object as Record<string, any>
					// support nested fields like 'sentiment.favorite'
					return fields.some(field => {
						const parts = field.split('.')
						let value = obj
						for (const part of parts) {
							if (value == null) {
								return false
							}
							value = value[part]
						}
						return value !== undefined && value !== null
					})
				},
				defaultMessage(args: ValidationArguments) {
					return `At least one of [${fields.join(', ')}] must be provided`
				},
			},
		})
	}
}
