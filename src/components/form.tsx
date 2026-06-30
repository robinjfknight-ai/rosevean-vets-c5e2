import type { ComponentProps, ReactNode } from "react";

const fieldBase =
  "w-full rounded-xl border border-forest-200 bg-paper px-4 py-2.5 text-ink shadow-sm transition-colors placeholder:text-muted/60 focus:border-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-200 aria-[invalid=true]:border-coral-500 aria-[invalid=true]:ring-coral-500/20";

export function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-1.5 block text-sm font-semibold text-forest-800"
        >
          {label}
          {required && <span className="text-coral-600"> *</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-coral-600">{error}</p>
      )}
    </div>
  );
}

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return <input className={`${fieldBase} ${className}`} {...props} />;
}

export function Textarea({
  className = "",
  ...props
}: ComponentProps<"textarea">) {
  return <textarea className={`${fieldBase} ${className}`} {...props} />;
}

export function Select({ className = "", ...props }: ComponentProps<"select">) {
  return <select className={`${fieldBase} ${className}`} {...props} />;
}

export function Checkbox({
  label,
  id,
  ...props
}: { label: ReactNode } & ComponentProps<"input">) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 text-sm text-ink/85">
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 h-5 w-5 shrink-0 rounded border-forest-300 text-forest-600 focus:ring-forest-300"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}

export function Fieldset({
  legend,
  description,
  children,
}: {
  legend: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="border-t border-forest-100 pt-7">
      {/* Keep the fieldset accessible, but render the heading in normal
          flow so spacing is predictable (a floated <legend> overlaps rows). */}
      <legend className="sr-only">{legend}</legend>
      <h3 className="font-display text-lg font-semibold text-forest-800">
        {legend}
      </h3>
      {description && (
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
      )}
      <div className="mt-5">{children}</div>
    </fieldset>
  );
}
