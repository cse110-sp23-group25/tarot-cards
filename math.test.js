// math.test.js
const { add, subtract } = require('./math');

test('should add two numbers correctly', () => {
  const result = add(2, 3);
  expect(result).toBe(5);
});

test('should add two numbers correctly', () => {
  const result = add(3, 3);
  expect(result).toBe(6);
});

test('should add two numbers correctly', () => {
  const result = add(3, 2);
  expect(result).toBe(5);
});

