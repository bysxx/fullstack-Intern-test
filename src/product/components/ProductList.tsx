import type { Product } from '../model/product.types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex items-end justify-between mb-12">
        <h2 className="font-serif text-3xl font-normal text-gray-900">
          Latest Arrivals
        </h2>
        <span className="hidden sm:block text-sm text-gray-500 font-sans">
          {products.length} Products
        </span>
      </div>
      
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
