import { z } from "zod";

// Hero 섹션 데이터 구조
export const HeroSchema = z.object({
  headline: z.string(),
  subCopy: z.string(),
  ctaText: z.string(),
});

export type Hero = z.infer<typeof HeroSchema>;

// 개별 상품 데이터 구조
export const ProductSchema = z.object({
  id: z.number(),
  brand: z.string(),
  name: z.string(),
  price: z.number().int().nonnegative("가격은 0원 이상이어야 합니다."),
  image: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

// 전체 product.json 파일 구조
export const ProductPageDataSchema = z.object({
  hero: HeroSchema,
  products: z.array(ProductSchema),
});

export type ProductPageData = z.infer<typeof ProductPageDataSchema>;
