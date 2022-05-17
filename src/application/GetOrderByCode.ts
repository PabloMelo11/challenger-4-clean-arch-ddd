import Order from '../domain/entity/Order';
import OrderRepository from '../domain/repository/OrderRepository';

export default class GetOrderByCode {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute({ code }: Input): Promise<Order> {
    const order = await this.orderRepository.findByCode(code);

    if (!order) throw new Error('Order does not exists');

    return order;
  }
}

type Input = {
  code: string;
};
