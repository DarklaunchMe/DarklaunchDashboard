import { Field } from '../types/types';

/**
 * Given a list of fields as strings, return them in a key, value object pair.
 * The key has no spaces and is all lowercase. Useful for state tracking (See: AuthModal.tsx)
 * @param fields 
 * @returns {key: myKey, value: myValue}
 */
export function fieldFactory(fields: string[]): Field[] {
    return fields.map((field) => {
        return {
            key: field.replace(' ', '').toLowerCase(),
            value: field
        };
    });
}
