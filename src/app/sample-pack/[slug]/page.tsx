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

        <div className="mt-lg grid grid-cols-12 gap-x-5">
          <div className="col-span-12 flex flex-col sm:col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-2">
              <img
                src={product.image}
                alt={`Sample Pack: ${product.name}`}
                className="product-image absolute inset-0 h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
