/**
 * Formats fields for JavaScript.
 *
 * Transforms PascalCase to camelCase
 * Accepts custom mappings, for use when rules defined here are not sufficient
 * @param {Object} resultsObject - A single result.
 * @param {Object} customMappings - Object mapping field -> JavaScript field.
 * @returns {Object} formatted result
 */
export default function cleanseB2Object(resultsObject: object, customMappings: object = {}): object {
  const formattedObject = {};
  Object.keys(resultsObject).forEach(key => {
    // If there is a custom mapping for this key, use it
    if (customMappings[key]) {
      formattedObject[customMappings[key]] = resultsObject[key];
    } else {
      // Lowercase the first letter
      const pascalCasedKey = key[0].toLowerCase() + key.slice(1);
      formattedObject[pascalCasedKey] = resultsObject[key];
    }
  });
  return formattedObject;
}
