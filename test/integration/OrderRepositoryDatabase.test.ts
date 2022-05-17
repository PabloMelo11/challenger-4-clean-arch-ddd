import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';

test('Deve retornar uma order pelo seu código', async () => {
  const connection = new PgPromiseConnectionAdapter();
  const orderRepository = new OrderRepositoryDatabase(connection);
  const order = await orderRepository.findByCode('202200000001');
  expect(order?.code.value).toBe('202200000001');
  await connection.close();
});
