type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, accent, description, centered }: SectionHeadingProps) {
  const parts = accent ? title.split(accent) : [title];

  return (
    <header className={centered ? 'section-heading section-heading--center' : 'section-heading'}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="section-title">
        {accent && parts.length > 1 ? (
          <>
            {parts[0]}
            <em>{accent}</em>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description ? <p className="section-description">{description}</p> : null}
    </header>
  );
}
