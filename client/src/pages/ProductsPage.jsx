// src/pages/ProductsPage.jsx
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import FilterSidebar from '../components/FilterSidebar.jsx';
import SortBar from '../components/SortBar.jsx';
import Pagination from '../components/Pagination.jsx';
import ProductGrid from '../components/ProductGrid.jsx';

function useQueryObj(params) {
  return useMemo(() => {
    const q = Object.fromEntries(params.entries());
    return {
      q: q.q || '',
      category: q.category || '',
      brand: q.brand || '',
      min: q.min || '',
      max: q.max || '',
      inStock: q.inStock === 'true' ? true : undefined,
      sort: q.sort || 'new',
      page: Number(q.page || 1),
      pageSize: Number(q.pageSize || 12),
    };
  }, [params]);
}

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const qo = useQueryObj(params);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({ products: [], total: 0 });

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await api.get('/products', {
          params: {
            q: qo.q || undefined,
            category: qo.category || undefined,
            brand: qo.brand || undefined,
            min: qo.min || undefined,
            max: qo.max || undefined,
            inStock: qo.inStock ? true : undefined,
            sort: qo.sort || undefined,
            page: qo.page || 1,
            pageSize: qo.pageSize || 12,
          },
          signal: controller.signal,
        });
        setData({ products: data.products || [], total: data.total ?? (data.products?.length || 0) });
      } catch (e) {
        if (e.name === 'CanceledError' || e.code === 'ERR_CANCELED') return;
        setError('Não foi possível carregar os produtos.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [qo.q, qo.category, qo.brand, qo.min, qo.max, qo.inStock, qo.sort, qo.page, qo.pageSize]);

  function updateParams(next) {
    const merged = {
      ...Object.fromEntries(params.entries()),
      ...next,
    };
    // remove vazios/undefined
    Object.keys(merged).forEach((k) => {
      if (merged[k] === '' || merged[k] === undefined || merged[k] === null) delete merged[k];
    });
    setParams(merged, { replace: true });
  }

  return (
    <section className="container">
      <h2 style={{ marginTop: 0 }}>Produtos</h2>

      <div className="row" style={{ alignItems: 'flex-start', gap: 16 }}>
        <FilterSidebar
          initial={qo}
          onApply={(f) => updateParams({ ...f, page: 1 })}
          onClear={() => setParams({}, { replace: true })}
        />

        <div className="col" style={{ flex: 1 }}>
          <SortBar
            total={data.total}
            sort={qo.sort}
            pageSize={qo.pageSize}
            onSort={(v) => updateParams({ sort: v, page: 1 })}
            onPageSize={(n) => updateParams({ pageSize: n, page: 1 })}
          />

          {loading ? (
            <div className="grid">
              {Array.from({ length: qo.pageSize }).map((_, i) => (
                <div key={i} className="card skeleton" style={{ height: 320 }} />
              ))}
            </div>
          ) : error ? (
            <div className="surface" style={{ padding: 16 }}>
              <p>{error}</p>
              <button className="btn" onClick={() => updateParams({})}>Tentar novamente</button>
            </div>
          ) : (
            <>
              <ProductGrid products={data.products} />
              <Pagination
                page={qo.page}
                pageSize={qo.pageSize}
                total={data.total}
                onChange={(p) => updateParams({ page: p })}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
