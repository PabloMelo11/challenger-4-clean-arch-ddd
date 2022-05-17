import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';

test('O peso do item não pode ser negativo', () => {
  expect(() => new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), -1)).toThrow(
    new Error('Weight of item invalid')
  );
});
