import Order from '../entity/Order';

export default interface OrderRepository {
  save(order: Order): Promise<void>;
  count(): Promise<number>;
  findByCode(code: string): Promise<Order | undefined>;
  getAll(): Promise<Order[]>;
}
