// register.mjs. Allow ts files to be used directly by Node.js in ESModules
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));
