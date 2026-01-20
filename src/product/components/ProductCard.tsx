import type { Product } from '../model/product.types';
import { formatCurrency } from '@/shared/utils/format';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { brand, name, price, image } = product;

  return (
    <div className="group cursor-pointer flex flex-col gap-4">
      {/* 이미지 영역: 3:4 비율 고정, Overflow hidden */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={`${brand} - ${name}`}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          unoptimized // 외부 이미지 도메인 사용
        />
        {/* 호버 시 나타나는 딤드(Dimmed) 효과나 버튼이 필요하다면 여기에 추가 */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col items-start gap-1">
        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
          {brand}
        </span>
        <h3 className="text-base font-normal text-gray-900 line-clamp-1 font-sans group-hover:underline decoration-1 underline-offset-4">
          {name}
        </h3>
        <p className="mt-1 text-sm font-medium text-gray-900 font-sans">
          {formatCurrency(price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
