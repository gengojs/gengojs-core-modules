import debug from 'gengojs-debug';
import _ from 'lodash';
import Extractify from './extractify';


/*
    ## Input
    
    **Definition**: 

    1. The first argument must be a string or an object.
      * The string is the phrase to i18n
      * The object must contain a 'phrase' key with a string value to i18n
    2. The second must be n number of strings, an array or an object.
      * The n number of strings will represent sprint-f
      * The array will represent sprint-f
      * The object will represent sprint-f, or other arguments
*/

/**
 * This class extends the Extractify class
 * by adding an API wrapper around it.
 * @class Inputify
 */
class Inputify extends Extractify {
  constructor(phrase, args) {
      super(phrase, args);
      debug('core', 'debug', `class: ${Inputify.name}`, `process: constructor`);
      debug('core', 'info', `class: ${Inputify.name}`,
        `\n\textract: ${JSON.stringify(this.extracts)}`,
        `\n\tphrase: ${this.phrase()}`,
        `\n\targs: ${JSON.stringify(this.arguments())}`);
    }
    /**
     * Returns the extracted phrase.
     * @return {String} - The phrase to internationalize.
     */
  phrase() {
      debug('core', 'debug', `class: ${Inputify.name}`, `process: phrase`);
      return this.extracts.phrase;
    }
    /**
     * Returns the extracted arguments.
     * @return {Array} - The extracted arguments.
     */
  arguments() {
      debug('core', 'debug', `class: ${Inputify.name}`, `process: arguments`);
      return this.extracts.args;
    }
    /**
     * Returns the extracted values.
     * @return {Object} - The extracted values (plain object).
     */
  values() {
    debug('core', 'debug', `class: ${Inputify.name}`, `process: values`);
    return this.extracts.values;
  }

  /**
   * Determines whether the arguments are empty.
   * @return {Boolean} True if the object is empty.
   */
  hasArgs() {
      debug('core', 'debug', `class: ${Inputify.name}`, `process: hasArgs`);
      return !_.isEmpty(this.extracts.args);
    }
    /**
     * Determines whether the values are empty.
     * @return {Boolean} True if the object is empty.
     */
  hasValues() {
    debug('core', 'debug', `class: ${Inputify.name}`, `process: hasValues`);
    return !_.isEmpty(this.extracts.values);
  }

}

/** 
 * Returns instance of Inputify.
 * @param  {String | Object} phrase The phrase to parse.
 * @param  {...String | Object | Array} args The arguments to apply to the phrase.
 * @return {Inputify}           An instance of Inputify
 */
function inputify(phrase, ...args) {
  'use strict';
  return new Inputify(phrase, args);
}

/** 
 * @module inputify
 */
export default inputify;