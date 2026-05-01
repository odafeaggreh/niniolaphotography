import StatusScreen from "@/app/components/StatusScreen";

export default function NotFound() {
  return (
    <StatusScreen
      eyebrow="Page Not Found"
      title="That page could not be found."
      description="The page may have been moved, removed, or the link may no longer be valid. You can head home, explore the portfolio, or reach out directly."
      code="404"
      actions={[
        { href: "/", label: "Go Home" },
        { href: "/contact", label: "Get in Touch", variant: "secondary" },
      ]}
    />
  );
}
