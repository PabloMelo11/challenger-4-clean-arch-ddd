import OrderItem from '../../src/domain/entity/OrderItem';

test('Deve criar um item de pedido', function () {
  const orderItem = new OrderItem(1, 1000, 2);
  expect(orderItem.getTotal()).toBe(2000);
});

test('Ao fazer um pedido, a quantidade de um item não pode ser negativa', function () {
  expect(() => new OrderItem(1, 1000, -2)).toThrow(
    new Error('Invalid quantity')
  );
});
