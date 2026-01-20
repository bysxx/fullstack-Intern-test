import { productRepository } from "product/service/product.repository";
import HeroSection from "../../shop/components/HeroSection";
import ProductList from "./ProductList";

/**
 * ProductPageContainer
 *
 * 이 컴포넌트는 "데이터 페칭"과 "UI 조합"을 담당하는 서버 컴포넌트입니다.
 * 클라이언트 컴포넌트와 서버 컴포넌트의 경계를 명확히 하고,
 * 데이터 로딩 로직을 캡슐화합니다.
 */
export default async function ProductPageContainer() {
  // Repository 패턴을 사용하여 데이터 소스로부터 데이터를 비동기로 가져옵니다.
  const productMetaData = await productRepository.getProductPageData();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero 섹션 렌더링 */}
      <HeroSection hero={productMetaData.hero} />

      {/* 상품 리스트 섹션 렌더링 */}
      <ProductList products={productMetaData.products} />
    </div>
  );
}
