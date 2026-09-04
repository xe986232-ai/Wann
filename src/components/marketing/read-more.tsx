"use client";

import { useState } from "react";

interface ReadMoreProps {
  text: string;
}

export function ReadMore({ text }: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p
        className={`whitespace-pre-line text-sm text-muted ${
          expanded ? "" : "line-clamp-5"
        }`}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="mt-2 text-sm text-foreground underline underline-offset-4 transition hover:text-accent"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
