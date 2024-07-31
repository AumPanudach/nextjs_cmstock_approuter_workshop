import { ProductData } from '@/models/product.model';
import { getProduct } from '@/store/slices/productSlice'
import { ACCESS_TOKEN_KEY } from '@/utils/constant';
import { Box } from '@mui/material';
import { cookies } from 'next/headers';
import ProductCard from "@/app/(routes)/shop/ProductCard"
import React from 'react'

type Props = {}

export default async function page({}: Props) {
    const cookieStore = cookies();
    const token = cookieStore.get(ACCESS_TOKEN_KEY);
    const result = await fetch( `${process.env.NEXT_PUBLIC_BASE_URL_API}/stock/product`, 
        {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        }
        }
    );
  const products =(await result.json()) as ProductData[];
  return (
    <Box className="grid gap-2 grid-cols-fluid w-full">
    {products.map((p) => (
      <ProductCard key={p.id} product={p} />
    ))}
  </Box>
  );
}