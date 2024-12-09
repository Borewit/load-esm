# load-esm

***load-esm*** is a utility for dynamically importing pure ESM (ECMAScript Module) packages in CommonJS TypeScript projects.
This is particularly useful when working with Node.js environments configured for CommonJS while needing to integrate ESM-only dependencies.

## Installation
```bash
npm install load-esm
```

or

```bash
yarn add load-esm
```

## Features
- Enables dynamic import of pure ESM modules in CommonJS-based projects.
- Compatible with TypeScript, offering proper type definitions.
- Simple and lightweight implementation.

## Usage

Here’s an example demonstrating how to use load-esm to dynamically load an ESM module in a CommonJS project:

```ts
import * as path from 'path';
import { loadModule } from 'load-esm';

/**
 * Import 'file-type' ES-Module in CommonJS Node.js module
 */
(async () => {
    try {
        // Dynamically import the ESM module
        const { fileTypeFromFile } = await loadModule('file-type');

        // Use the imported function
        const type = await fileTypeFromFile('fixture.gif');
        console.log(type);
    } catch (error) {
        console.error('Error importing module:', error);
    }
})();
```

## API

```ts
loadModule<T = any>(name: string): Promise<T>
```
Dynamically imports an ESM module.

#### Parameters
- `name` (string): The name or path of the module to load.

#### Returns
- A `Promise<T>` that resolves to the imported module object.
  
### Example
```ts
import { loadModule } from 'load-esm';

(async () => {
  const module = await loadModule('some-esm-module');
  console.log(module);
})();
```

## How It Works
The utility leverages Node.js's import() function to dynamically load ESM modules.
This allows CommonJS-based projects to interact with ESM dependencies without converting the entire project to ESM.

## Compatibility
- Node.js: Requires Node.js 13.2.0 or later, as import() is only supported in these versions and beyond.
- TypeScript: Fully typed and compatible with TypeScript.

## Why Use load-esm?
In mixed-module environments where your project is primarily CommonJS but relies on some ESM-only dependencies,
load-esm serves as a seamless bridge,
enabling interoperability without changing your project’s module system.

## License
[MIT](./LICENSE)