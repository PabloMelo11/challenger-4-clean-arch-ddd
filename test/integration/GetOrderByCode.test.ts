import GetOrderByCode from '../../src/application/GetOrderByCode';
import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import Order from '../../src/domain/entity/Order';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';

test('Deve retornar um pedido com base no código', async () => {
  const orderRepository = new OrderRepositoryMemory();
  const order = new Order('935.411.347-80', new Date('2022-01-01T10:00:10'), 1);
  order.addItem(
    new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3),
    1
  );
  order.addItem(
    new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20),
    1
  );
  order.addItem(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1), 1);
  orderRepository.save(order);
  const input = { code: '202200000001' };
  const getOrderByCode = new GetOrderByCode(orderRepository);
  const output = await getOrderByCode.execute(input);
  expect(output.code.value).toEqual(input.code);
  expect(output.orderItems).toHaveLength(3);
});
