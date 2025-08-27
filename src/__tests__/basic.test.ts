// Test básico para verificar que Jest está funcionando
describe('Basic Test Suite', () => {
  it('should pass a simple test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle basic string operations', () => {
    const message = 'Hello World';
    expect(message).toContain('Hello');
    expect(message.length).toBe(11);
  });

  it('should handle basic array operations', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers[0]).toBe(1);
    expect(numbers).toContain(3);
  });
});
