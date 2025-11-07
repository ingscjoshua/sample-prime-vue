# Test Suite

This directory contains unit tests for the Nuxt e-commerce application.

## Running Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

- `composables/` - Tests for Vue composables
- `services/` - Tests for API service classes
- `stores/` - Tests for Pinia stores
- `utils/` - Tests for utility functions

## Coverage

Coverage reports are generated in the `coverage/` directory when running `npm run test:coverage`.

## Writing Tests

Tests use Vitest and Vue Test Utils. Example:

```typescript
import { describe, it, expect } from 'vitest';

describe('MyFunction', () => {
  it('should do something', () => {
    expect(myFunction()).toBe(expected);
  });
});
```
