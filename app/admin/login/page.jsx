import { signIn } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function Login({ searchParams }) {
  const { error } = await searchParams;
  return (
    <main className="grid min-h-svh place-items-center px-6">
      <form action={signIn} className="w-full max-w-sm space-y-4">
        <h1 className="mb-8 font-display text-6xl tracking-tight">Studio</h1>
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Password" required />
        {error && <p className="text-sm text-signal">Wrong credentials.</p>}
        <Button className="w-full">Enter</Button>
      </form>
    </main>
  );
}