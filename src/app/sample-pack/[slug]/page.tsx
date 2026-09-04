import { Navbar } from "@/components/layout/navbar";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { getProductBySlug, products } from "@/lib/products";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col pb-xl">
      <Navbar />

      <div className="mt-md px-sm md:mt-lg md:px-lg">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Providers", href: "/providers" },
            {
              label: product.providerName,
              href: `/provider/sample-packs/${product.providerSlug}`,
            },
            { label: product.name },
          ]}
        />
      </div>
    </div>
  );
}
