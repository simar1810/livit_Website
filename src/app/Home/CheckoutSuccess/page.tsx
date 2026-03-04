import CheckoutSuccessClient from "./CheckoutSuccessClient";

interface CheckoutSuccessPageProps {
  searchParams?: { session_id?: string | string[] };
}

export default function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const raw = searchParams?.session_id;
  const sessionId = Array.isArray(raw) ? raw[0] ?? null : raw ?? null;
  return <CheckoutSuccessClient sessionId={sessionId} />;
}
