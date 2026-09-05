import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { ReadMore } from "@/components/marketing/read-more";
import { SamplesSection } from "@/components/marketing/samples-section";
import {
  DownloadIcon,
  FlameIcon,
  HeartIcon,
  PlayIcon,
  TileWaveformIcon,
} from "@/components/icons";
import { getProductBySlug, products } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";

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

          <div className="col-span-12 mt-4 flex flex-col gap-y-2 sm:col-span-6 sm:mt-0 md:col-span-7 lg:col-span-8 xl:col-span-9">
            <div className="flex items-center gap-2">
              <img
                src={product.providerImage}
                alt={`Provider: ${product.providerName}`}
                className="h-7 w-7 shrink-0 rounded-full object-cover"
              />
              <Link
                href={`/provider/sample-packs/${product.providerSlug}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {product.providerName}
              </Link>
            </div>

            <div className="mb-1 space-y-1">
              <h1
                className="break-words font-medium text-foreground"
                style={{
                  fontSize: "30px",
                  WebkitTextSizeAdjust: "none",
                  textSizeAdjust: "none",
                }}
              >
                {product.name}
              </h1>
              <h2
                className="text-muted"
                style={{
                  fontSize: "20px",
                  WebkitTextSizeAdjust: "none",
                  textSizeAdjust: "none",
                }}
              >
                {product.tagline}
              </h2>
            </div>

            <div className="flex min-h-[52px] items-center gap-2">
              <button
                type="button"
                aria-label="Play"
                className="flex h-[52px] w-[52px] shrink-0 touch-manipulation select-none items-center justify-center rounded-full border-[3px] border-accent text-accent transition-transform duration-200 ease-in-out active:scale-90"
              >
                <PlayIcon className="h-6 w-6" />
              </button>

              <button
                type="button"
                className="flex h-[52px] shrink-0 touch-manipulation select-none items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-medium text-white transition-all duration-200 ease-in-out hover:bg-accent-hover active:scale-95"
              >
                <DownloadIcon className="h-5 w-5" />
                Download
              </button>

              <button
                type="button"
                aria-label="Add to wishlist"
                className="flex h-[52px] w-[52px] shrink-0 touch-manipulation select-none items-center justify-center rounded-full bg-surface-2 text-muted transition-all duration-200 ease-in-out hover:text-foreground active:scale-90"
              >
                <HeartIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-row flex-wrap gap-2 py-2">
              {product.formats.map((format) => (
                <span
                  key={format}
                  className="flex flex-row items-center gap-1 rounded-full border border-surface-2 px-3 py-1 text-xs text-muted"
                >
                  <TileWaveformIcon className="h-4 w-4" />
                  {format}
                </span>
              ))}
              {product.featured && (
                <span className="flex flex-row items-center gap-1 rounded-full border border-surface-2 px-3 py-1 text-xs text-muted">
                  <FlameIcon className="h-4 w-4" />
                  Featured
                </span>
              )}
            </div>

            <ReadMore text={product.description} />
          </div>
        </div>

        {product.samples && product.samples.length > 0 && (
          <SamplesSection
            samples={product.samples}
            packImage={product.image}
            providerSlug={product.providerSlug}
          />
        )}
      </div>
    </div>
  );
}
