import { SectionArrowIcon } from "@/components/icons";
import { browseColumns, presetsColumn, type NavColumn } from "./nav-data";
import Link from "next/link";

function Column({ column }: { column: NavColumn }) {
  return (
    <div className="flex flex-1 flex-col gap-4 self-stretch rounded-lg bg-surface-2/60 p-5">
      <span className={`pl-1.5 text-sm ${column.accentClass}`}>{column.title}</span>

      {column.groups.map((group, i) => (
        <div key={i} className="flex flex-col items-start">
          {group.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex w-full items-center gap-2.5 rounded-lg py-1 pl-2 pr-2.5 text-xs text-foreground/90 transition-colors duration-200 hover:bg-white/5"
              >
                {Icon && <Icon width={18} height={18} className="shrink-0 text-muted" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}

      {column.viewAllHref && (
        <Link
          href={column.viewAllHref}
          className="inline-flex items-center gap-1.5 rounded-lg py-1 pl-2 pr-2.5 text-xs text-muted transition-colors duration-200 hover:bg-white/5 hover:text-foreground"
        >
          View all
          <SectionArrowIcon width={12} height={12} className="rotate-180" />
        </Link>
      )}
    </div>
  );
}

export function BrowseMegaMenu() {
  const [browse, genres, instruments, tools] = browseColumns;

  return (
    <div
      className="absolute left-1/2 top-full z-40 hidden -translate-x-1/2 pt-4 group-hover:block"
      role="menu"
    >
      <div className="flex w-[770px] items-stretch gap-2 rounded-xl border border-white/10 bg-surface p-2">
        <Column column={browse} />
        <Column column={genres} />
        <Column column={instruments} />

        {/* Tools + Presets share one column, like the reference layout */}
        <div className="flex flex-1 flex-col gap-4 self-stretch rounded-lg bg-surface-2/60 p-5">
          <span className={`pl-1.5 text-sm ${tools.accentClass}`}>{tools.title}</span>
          <div className="flex flex-col items-start">
            {tools.groups[0].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex w-full items-center gap-2.5 rounded-lg py-1 pl-2 pr-2.5 text-xs text-foreground/90 transition-colors duration-200 hover:bg-white/5"
                >
                  {Icon && <Icon width={18} height={18} className="shrink-0 text-muted" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <span className={`pl-1.5 text-sm ${presetsColumn.accentClass}`}>
            {presetsColumn.title}
          </span>
          <div className="flex flex-col items-start">
            {presetsColumn.groups[0].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex w-full items-center rounded-lg py-1 pl-2 pr-2.5 text-xs text-foreground/90 transition-colors duration-200 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </div>
          {presetsColumn.viewAllHref && (
            <Link
              href={presetsColumn.viewAllHref}
              className="inline-flex items-center gap-1.5 rounded-lg py-1 pl-2 pr-2.5 text-xs text-muted transition-colors duration-200 hover:bg-white/5 hover:text-foreground"
            >
              View all
              <SectionArrowIcon width={12} height={12} className="rotate-180" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
