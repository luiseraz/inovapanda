import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

export default function AdminProductFormPage() {
  const nav = useNavigate();
  const { idOrSlug } = useParams(); // se existe => edição
  const editing = Boolean(idOrSlug);

  const [loading, setLoading] = useState(editing);
  const [form, setForm] = useState({
    name: '', slug: '', description: '',
    price: '', compareAtPrice: '',
    image: '', brand: '', category: '',
    stock: 0,
  });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!editing) return;
    const ctl = new AbortController();
    (async () => {
      try {
        const { data } = await api.get(`/products/${idOrSlug}`, { signal: ctl.signal });
        const p = data.product;
        setForm({
          name: p.name || '',
          slug: p.slug || '',
          description: p.description || '',
          price: p.price ?? '',
          compareAtPrice: p.compareAtPrice ?? '',
          image: p.image || '',
          brand: p.brand || '',
          category: p.category || '',
          stock: p.stock ?? 0,
        });
      } finally {
        setLoading(false);
      }
    })();
    return () => ctl.abort();
  }, [editing, idOrSlug]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg('');
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice === '' ? null : Number(form.compareAtPrice),
        stock: Number(form.stock || 0),
      };
      if (editing) {
        await api.put(`/products/${idOrSlug}`, payload);
      } else {
        await api.post('/products', payload);
      }
      nav('/admin/produtos');
    } catch (err) {
      const m = err?.response?.data?.message || 'Erro ao salvar.';
      setMsg(m);
    }
  }

  if (loading) return <div className="card skeleton" style={{ height: 320 }} />;

  return (
    <section className="section">
      <div className="section-header">
        <h3>{editing ? 'Editar produto' : 'Novo produto'}</h3>
      </div>

      <form className="surface col" style={{ padding: 16, gap: 12 }} onSubmit={onSubmit}>
        {msg && (
          <div className="badge" style={{ borderColor: '#d84b4b', color: '#fff', background: '#d84b4b22' }}>
            {msg}
          </div>
        )}

        <div className="row" style={{ gap: 12 }}>
          <div className="col" style={{ flex: 2 }}>
            <label>Nome*</label>
            <input className="input" name="name" value={form.name} onChange={onChange} required />
          </div>
          <div className="col" style={{ flex: 1 }}>
            <label>Slug (opcional)</label>
            <input className="input" name="slug" value={form.slug} onChange={onChange} placeholder="auto se vazio" />
          </div>
        </div>

        <div className="row" style={{ gap: 12 }}>
          <div className="col" style={{ flex: 1 }}>
            <label>Preço*</label>
            <input className="input" type="number" name="price" step="0.01" min="0" value={form.price} onChange={onChange} required />
          </div>
          <div className="col" style={{ flex: 1 }}>
            <label>Preço antigo</label>
            <input className="input" type="number" name="compareAtPrice" step="0.01" min="0" value={form.compareAtPrice} onChange={onChange} />
          </div>
          <div className="col" style={{ flex: 1 }}>
            <label>Estoque</label>
            <input className="input" type="number" name="stock" min="0" value={form.stock} onChange={onChange} />
          </div>
        </div>

        <div className="row" style={{ gap: 12 }}>
          <div className="col" style={{ flex: 2 }}>
            <label>Imagem (URL)</label>
            <input className="input" name="image" value={form.image} onChange={onChange} placeholder="https://…" />
          </div>
          <div className="col" style={{ flex: 1 }}>
            <label>Marca</label>
            <input className="input" name="brand" value={form.brand} onChange={onChange} />
          </div>
          <div className="col" style={{ flex: 1 }}>
            <label>Categoria</label>
            <input className="input" name="category" value={form.category} onChange={onChange} placeholder="Periféricos, Áudio…" />
          </div>
        </div>

        <div className="col">
          <label>Descrição</label>
          <textarea className="input" rows={5} name="description" value={form.description} onChange={onChange} />
        </div>

        <div className="row" style={{ gap: 10, justifyContent: 'flex-end' }}>
          <button className="btn btn-outline" type="button" onClick={() => history.back()}>Cancelar</button>
          <button className="btn" type="submit">{editing ? 'Salvar alterações' : 'Criar produto'}</button>
        </div>
      </form>
    </section>
  );
}
