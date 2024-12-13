[![NPM version](https://img.shields.io/npm/v/load-esm.svg)](https://npmjs.org/package/load-esm)

# load-esm

***load-esm*** is a utility for dynamically importing pure ESM (ECMAScript Module) packages in CommonJS TypeScript projects.

This resolves the error:
```
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in...
```

## Installation
```bash
npm install load-esm
```

or

```bash
yarn add load-esm
```

## Usage

Here’s a conceptual example demonstrating how to use load-esm to dynamically load an ESM module in a CommonJS project:

```ts
import {loadEsm} from 'load-esm';

/**
 * Import 'file-type' ES-Module in CommonJS Node.js module
 */
(async () => {
  const esmModule = await loadEsm('esm-module');
})();
```

To import the typings you need do the following:
```ts
import {loadEsm} from 'load-esm';
(async () => {
const esmModule = await loadEsm<typeof import('esm-module')>('esm-module');
})();
```

A concrete example loading [file-typ](https://github.com/sindresorhus/file-type), a pure ESM package:

```ts
import {loadEsm} from 'load-esm';

/**
 * Import 'file-type' ES-Module in CommonJS Node.js module
 */
(async () => {
    try {
        // Dynamically import the ESM module, including types
        const { fileTypeFromFile } = await loadEsm<typeof import('file-type')>('file-type');

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
loadEsm<T = any>(name: string): Promise<T>
```
Dynamically imports an ESM module.

#### Parameters
- `name` (string): The name or path of the module to load.

#### Returns
- A `Promise<T>` that resolves to the imported module object.

## How It Works
Using `await import` in a CommonJS TypeScript project poses challenges because the TypeScript compiler transpiles `import()` statements to `require()` calls when module is set to CommonJS in `tsconfig.json`.
This behavior conflicts with the dynamic nature of `import()` used for ESM.

Workarounds, such as wrapping the `import()` statement within `eval()` or similar constructs, can prevent TypeScript from transpiling it, but these approaches are clunky and error-prone.

The utility of [load-esm](https://github.com/Borewit/load-esm) bypasses the TypeScript compiler by executing the `import()` outside the compilation scope. 
By doing so, it maintains the intended behavior of `import()` for loading ESM modules dynamically, 
providing a clean and effective solution for such scenarios.

## Compatibility
- Node.js: Requires Node.js 13.2.0 or later, as import() is only supported in these versions and beyond.
- TypeScript: Fully typed and compatible with TypeScript.

## License
[MIT](./LICENSE)
