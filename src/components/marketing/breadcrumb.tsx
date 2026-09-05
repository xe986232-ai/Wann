import { ChevronRightIcon } from "@/components/icons";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <ol
      className="flex flex-wrap items-center gap-x-2 gap-y-2"
      itemScope
      itemType="http://schema.org/BreadcrumbList"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <li
            key={item.label}
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
            className="inline-flex min-w-0 items-center"
          >
            <meta itemProp="position" content={String(index + 1)} />

            {index > 0 && (
              <ChevronRightIcon className="mx-2 h-3.5 w-3.5 shrink-0 text-muted" />
            )}

            {isLast || !item.href ? (
              <span itemProp="name" className="truncate text-xs text-foreground">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                itemProp="item"
                className="truncate text-xs text-muted transition hover:text-foreground"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  );
}
