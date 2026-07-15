import Container from "./Container";

export default function Section({
  children,
  className = "",
  id = "",
}) {
  return (
    <section
      id={id}
      className={`min-h-[calc(100vh-80px)] flex items-center ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}