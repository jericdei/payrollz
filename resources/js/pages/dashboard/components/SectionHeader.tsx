interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h2 className="mb-4 text-sm font-medium text-muted-foreground">
      {title}
    </h2>
  );
}
