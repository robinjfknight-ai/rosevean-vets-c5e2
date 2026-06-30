"use client";

// A custom global error boundary. Next.js 16's *default* global-error page can
// intermittently fail to prerender during `next build`
// ("Cannot read properties of null (reading 'useContext')"). Providing our own
// makes the build deterministic. It must render <html>/<body> as it replaces
// the root layout when a top-level error occurs.

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-GB">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          background: "#f1f4fc",
          color: "#101a40",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ marginTop: "0.75rem", color: "#525f80" }}>
            Sorry — please try again. If the problem continues, refresh the page.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "1.5rem",
              padding: "0.65rem 1.4rem",
              borderRadius: "9999px",
              border: "none",
              background: "#16216a",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
