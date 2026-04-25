import React, { memo } from "react";

interface HighlightedTextProps {
  text: string | undefined | null;
  query: string;
}

export const HighlightedText = memo(function HighlightedText({
  text,
  query,
}: HighlightedTextProps) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text?.split(regex);

  return (
    <>
      {parts?.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
});
