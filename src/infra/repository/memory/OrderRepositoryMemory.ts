import Order from '../../../domain/entity/Order';
import OrderRepository from '../../../domain/repository/OrderRepository';

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async count(): Promise<number> {
    return this.orders.length;
  }

  async findByCode(code: string): Promise<Order | undefined> {
    return this.orders.find((order) => order.code.value === code);
  }

  async getAll(): Promise<Order[]> {
    return this.orders;
  }
}
