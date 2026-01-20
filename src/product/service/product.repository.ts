import fs from "fs/promises";
import path from "path";
import { type ProductPageData, ProductPageDataSchema } from "../model/product.types";

export const productRepository = {
  async getProductPageData(): Promise<ProductPageData> {
    try {
      // 실제 서비스라면 DB나 외부 API를 호출하겠지만, 여기서는 로컬 json 파일을 읽습니다.
      const productFilePath = path.join(process.cwd(), "product.json");
      const productFileContents = await fs.readFile(productFilePath, "utf-8");
      const productData = JSON.parse(productFileContents);

      // Zod를 사용하여 런타임 데이터 검증을 수행합니다.
      // 외부 데이터 소스는 언제나 불확실하므로 검증 단계가 필수적입니다.
      const parsedData = ProductPageDataSchema.parse(productData);

      return parsedData;
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      throw new Error("상품 데이터를 불러오는데 실패했습니다.");
    }
  },
};
