import assert from 'node:assert';

// Mock browser localStorage for node testing
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

const { storage } = await import('../src/utils/storage.js');

console.log('--- RUNNING NEXUS STORAGE RESILIENCE TESTS ---');

// Test 1: Empty on start
assert.deepStrictEqual(storage.getPreferences(), {}, 'Preferences should initialize as empty object');
console.log('✓ Test 1 Passed: Empty state returns empty object without error.');

// Test 2: Saving and retrieving preferences
storage.savePreferences({ sound: false, compactView: true });
const loadedPrefs = storage.getPreferences();
assert.strictEqual(loadedPrefs.compactView, true);
assert.strictEqual(loadedPrefs.sound, false);
console.log('✓ Test 2 Passed: UI preferences save and retrieve accurately.');

// Test 3: Clear preferences
storage.clearPreferences();
assert.deepStrictEqual(storage.getPreferences(), {});
console.log('✓ Test 3 Passed: Reset clears UI preferences.');

// Test 4: Corrupted JSON recovery
global.localStorage.setItem('nexus_ui_preferences', 'INVALID_MALFORMED_JSON{{{');
const recovered = storage.getPreferences();
assert.deepStrictEqual(recovered, {}, 'Should recover safely with empty object upon corrupted JSON');
console.log('✓ Test 4 Passed: Corrupted JSON handled safely with fallback.');

// Test 5: Verify NO tournament data keys are stored in localStorage
assert.strictEqual(global.localStorage.getItem('nexus_tournament_teams'), null);
assert.strictEqual(global.localStorage.getItem('nexus_tournament_fixtures'), null);
console.log('✓ Test 5 Passed: No tournament data (teams/fixtures) stored in localStorage.');

console.log('\n>>> ALL 5 STORAGE TESTS PASSED SUCCESSFULLY! <<<');
