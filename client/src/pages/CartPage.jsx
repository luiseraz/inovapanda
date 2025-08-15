import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function CartPage() {
  const { items, setQty, removeItem, clear, subtotal, shipping, total } = useCart();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  async function checkout() {
    if (!isAuth) {
      navigate('/login?from=/carrinho');
      return;
    }
    try {
      const payload = {
        items: items.map((i) => ({ productId: i.productId, qty: i.qty })),
        address: { fullName: 'Cliente', street: 'Rua Exemplo, 123', city: 'Cidade', state: 'UF', zip: '00000-000', country: 'BR' }
      };
      const { data } = await api.post('/orders', payload);
      clear();
      alert('Pedido criado com sucesso! Número: ' + data.order._id);
      navigate('/');
    } catch (e) {
      console.error(e);
      alert('Erro ao finalizar compra.');
    }
  }

  return (
    <section>
      <h2>Seu carrinho</h2>
      {items.length === 0 && <p>Seu carrinho está vazio.</p>}

      {items.map((i) => (
        <div key={i.productId} className="row" style={{ justifyContent: 'space-between', borderBottom: '1px solid #1f2937', padding: '12px 0' }}>
          <div className="row">
            <img src={i.image || 'https://placehold.co/80x80/png'} alt="" width="80" height="80" style={{ borderRadius: 8 }} />
            <div className="col">
              <strong>{i.name}</strong>
              <span className="small">R$ {i.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="row">
            <input
              type="number"
              min="1"
              className="input"
              style={{ width: 90 }}
              value={i.qty}
              onChange={(e) => setQty(i.productId, parseInt(e.target.value || 1))}
            />
            <button className="btn btn-outline" onClick={() => removeItem(i.productId)}>Remover</button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="col" style={{ alignItems: 'flex-end', gap: 6, marginTop: 12 }}>
          <div className="small">Subtotal: R$ {subtotal.toFixed(2)}</div>
          <div className="small">Frete: {shipping === 0 ? 'GRÁTIS' : `R$ ${shipping.toFixed(2)}`}</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Total: R$ {total.toFixed(2)}</div>

          <div className="row">
            <button className="btn btn-outline" onClick={() => clear()}>Limpar carrinho</button>
            <button className="btn" onClick={checkout}>Finalizar compra</button>
          </div>
        </div>
      )}
    </section>
  );
}
