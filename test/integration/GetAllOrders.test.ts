import GetAllOrders from '../../src/application/GetAllOrders';
import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import Order from '../../src/domain/entity/Order';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';

test('Deve retornar a lista de pedidos', async () => {
  const orderRepository = new OrderRepositoryMemory();
  const order1 = new Order(
    '935.411.347-80',
    new Date('2022-01-01T10:00:10'),
    1
  );
  const order2 = new Order(
    '935.411.347-80',
    new Date('2022-01-01T10:00:10'),
    2
  );
  order1.addItem(
    new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3),
    1
  );
  order1.addItem(
    new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20),
    1
  );
  order1.addItem(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1), 1);
  order2.addItem(
    new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3),
    1
  );
  order2.addItem(
    new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20),
    1
  );
  order2.addItem(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1), 1);
  orderRepository.save(order1);
  orderRepository.save(order2);
  const getAllOrders = new GetAllOrders(orderRepository);
  const output = await getAllOrders.execute();
  expect(output).toHaveLength(2);
});
