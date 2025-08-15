// Constantes compartilhadas da InovaPanda

/** Categorias exibidas na navbar / tiles da home */
export const CATEGORIES = [
  {
    name: 'Periféricos',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Áudio',
    image:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=687&auto=format&fit=crop',
  },
  {
    name: 'Smart Home',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Gamer',
    image:
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Acessórios',
    image:
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop',
  },
];

/** Slides do banner principal da home */
export const HOME_SLIDES = [
  {
    title: 'Tecnologia importada, preço local',
    text: 'Conecte-se ao futuro com produtos selecionados pela InovaPanda.',
    cta: { label: 'Ver novidades', to: '/produtos?q=novo' },
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Setup gamer completo',
    text: 'Periféricos e áudio para elevar seu nível.',
    cta: { label: 'Linha gamer', to: '/produtos?category=Periféricos' },
    image:
      'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=1170&auto=format&fit=crop',
  },
  {
    title: 'Áudio imersivo',
    text: 'Headsets e fones premium com envio rápido.',
    cta: { label: 'Ver áudio', to: '/produtos?category=Áudio' },
    image:
      'https://plus.unsplash.com/premium_photo-1664195074794-35beb8cd632f?q=80&w=1123&auto=format&fit=crop',
  },
];

/** Benefícios para a faixa de vantagens da home (se quiser usar) */
export const BENEFITS = [
  { icon: '🚚', label: 'Frete grátis acima de R$ 300' },
  { icon: '🔒', label: 'Pagamento seguro' },
  { icon: '🛡️', label: 'Garantia de 7 dias' },
  { icon: '⚡', label: 'Importados à pronta entrega' },
];

/** Opções de ordenação padronizadas (página de produtos) */
export const SORT_OPTIONS = [
  { label: 'Mais vendidos', value: 'bestsellers' },
  { label: 'Lançamentos', value: 'new' },
  { label: 'Menor preço', value: 'price-asc' },
  { label: 'Maior preço', value: 'price-desc' },
];
