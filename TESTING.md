# Testing Documentation

## Overview

This project now includes comprehensive unit tests with **90.24% code coverage**.

## Test Suite

### Running Tests

```bash
# Run all tests once
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage report
bun test:coverage
```

### Test Coverage

```
File               | % Stmts | % Branch | % Funcs | % Lines
-------------------|---------|----------|---------|--------
All files          |   90.24 |    93.54 |   96.42 |   90.24
 composables       |     100 |       80 |     100 |     100
 config            |     100 |      100 |     100 |     100
 services          |   95.89 |     90.9 |     100 |   95.89
 stores            |   76.59 |    95.23 |   91.66 |   76.59
 utils             |     100 |      100 |     100 |     100
```

## Test Files

### Services

- `tests/services/AuthService.test.ts` - Authentication service tests (8 tests)
- `tests/services/ProductService.test.ts` - Product service tests (9 tests)

### Stores

- `tests/stores/cart.test.ts` - Cart store tests (13 tests)

### Composables

- `tests/composables/useApi.test.ts` - API composable tests (4 tests)

### Utils

- `tests/utils/validation.test.ts` - Validation utility tests (6 tests)
- `tests/utils/errorHandler.test.ts` - Error handler tests (6 tests)

## Total: 46 Tests Passing ✓

## Technologies

- **Vitest** - Fast unit test framework
- **@vue/test-utils** - Vue component testing utilities
- **happy-dom** - Lightweight DOM implementation
- **@vitest/coverage-v8** - Code coverage reporting

## Fixed Issues

1. ✅ Fixed `$t` vs `t` bug in login.vue
2. ✅ Removed password field from User model
3. ✅ Made phone field optional in User model
4. ✅ Fixed TypeScript types (removed `any[]`)
5. ✅ Added missing imports to useApi composable
6. ✅ Renamed auth.global.ts to auth.ts
7. ✅ Added macOS hidden files to .gitignore
