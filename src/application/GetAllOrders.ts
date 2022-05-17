import OrderRepository from '../domain/repository/OrderRepository';

export default class GetAllOrders {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(): Promise<Output[]> {
    const orders = await this.orderRepository.getAll();
    const output: Output[] = [];
    for (const order of orders) {
      output.push({
        code: order.code.value,
        cpf: order.cpf.value,
        freight: Number(order.freight.total),
        date: new Date(order.date),
        sequence: order.sequence,
        total: order.getTotal(),
      });
    }
    return output;
  }
}
type Output = {
  code: string;
  total: number;
  sequence: number;
  freight: number;
  date: Date;
  cpf: string;
};
