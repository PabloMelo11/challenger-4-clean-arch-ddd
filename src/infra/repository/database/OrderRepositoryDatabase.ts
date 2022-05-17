import Item from '../../../domain/entity/Item';
import Order from '../../../domain/entity/Order';
import OrderItem from '../../../domain/entity/OrderItem';
import OrderRepository from '../../../domain/repository/OrderRepository';
import Connection from '../../database/Connection';

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [orderQuery] = await this.connection.query(
      'insert into ccca.order (code, cpf, issue_date, freight, sequence, total, coupon) values ($1, $2, $3, $4, $5, $6, $7) returning *',
      [
        order.code.value,
        order.cpf.value,
        order.date,
        order.freight.getTotal(),
        order.sequence,
        order.getTotal(),
        order.coupon?.code,
      ]
    );
    for (const orderItem of order.orderItems) {
      await this.connection.query(
        'insert into ccca.order_item (id_order, id_item, price, 	quantity) values ($1, $2, $3, $4)',
        [
          orderQuery.id_order,
          orderItem.idItem,
          orderItem.price,
          orderItem.quantity,
        ]
      );
    }
  }

  async count(): Promise<number> {
    const [row] = await this.connection.query(
      'select count(*)::int from ccca.order',
      []
    );
    return row.count;
  }

  async findByCode(code: string): Promise<Order | undefined> {
    const [orderQuery] = await this.connection.query(
      'select * from ccca.order where code = $1',
      [code]
    );
    const order = new Order(
      orderQuery.cpf,
      new Date(orderQuery.issue_date),
      orderQuery.sequence
    );
    const orderItems = await this.connection.query(
      'select * from ccca.order_item where id_order = $1',
      [orderQuery.id_order]
    );
    order.orderItems = orderItems;
    return order;
  }

  async getAll(): Promise<Order[]> {
    const ordersQuery = await this.connection.query(
      'select * from ccca.order',
      []
    );
    const orders: Order[] = [];
    for (const orderQuery of ordersQuery) {
      const order = new Order(
        orderQuery.cpf,
        new Date(orderQuery.issue_date),
        orderQuery.sequence
      );
      const orderItems = await this.connection.query(
        'select * from ccca.order_item where id_order = $1',
        [orderQuery.id_order]
      );
      order.orderItems = orderItems;
      orders.push(order);
    }
    return orders;
  }
}
