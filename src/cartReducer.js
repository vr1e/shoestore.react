export default function cartReducer(cart, action) {
	switch (action.type) {
		case 'empty':
			return [];
		case 'add': {
			const { id, sku } = action;
			const itemInCart = cart.find(i => i.sku === sku);

			return itemInCart
				? // Return a new array with the matching item replaced
				  cart.map(i =>
						i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
				  )
				: // Return a new arrray with the new item appended
				  [...cart, { id, sku, quantity: 1 }];
		}
		case 'updateQuantity': {
			const { sku, quantity } = action;

			return quantity === 0
				? cart.filter(i => i.sku !== sku)
				: cart.map(i => (i.sku === sku ? { ...i, quantity } : i));
		}
		default:
			throw new Error('Unhandled action ' + action.type);
	}
}
