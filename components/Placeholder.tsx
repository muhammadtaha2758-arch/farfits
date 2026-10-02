type PlaceholderProps = {
  tone?: string;
  label: string;
  ratio?: string;
  dark?: boolean;
  className?: string;
};

export function Placeholder({
  tone = "#e9e9e9",
  label,
  ratio = "4/5",
  dark,
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`ph ${dark ? "dk" : ""} ${className}`.trim()}
      style={{ ["--t" as string]: tone, ["--r" as string]: ratio }}
      data-s={label}
    >
      <i />
    </div>
  );
}
