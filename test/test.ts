import {describe, it} from 'mocha';
import * as chai from 'chai';
import * as path from 'path';
import {loadEsm} from '../index.js';

const {expect} = chai;

describe('loadEsm', function () {
  it('should load an ES module dynamically', async function () {
    // Mock ES module file for testing.
    const modulePath = path.join(__dirname, 'mock.mjs');

    // Load the ES module dynamically using loadEsm.
    const esmModule = await loadEsm(`file://${modulePath}`);

    // Verify the loaded module.
    expect(esmModule).to.be.an('module');
    expect(esmModule.testValue).to.equal(42);
  });

  it('should throw an error if the module path is invalid', async function () {
    const invalidPath = 'file:///non-existent-module.js';

    try {
      await loadEsm(invalidPath);
      // If no error is thrown, this test should fail.
      throw new Error('Expected loadEsm to throw an error, but it did not.');
    } catch (error) {
      // Verify that the error is thrown.
      expect(error).to.be.an('error');
    }
  });
});
