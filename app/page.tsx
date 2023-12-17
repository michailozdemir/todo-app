import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <section className="py-16 w-full max-w-7xl sm:py-32 2xl:py-64 text-center bg-hero-bg dark:bg-hero-bg-dark bg-no-repeat bg-600 bg-bottom sm:bg-center sm:bg-1100 2xl:bg-auto">
      <div className="px-4">
        <h1 className="text-4xl font-medium text-transparent sm:text-7xl bg-clip-text bg-gradient-to-r from-foreground to-slate-500 dark:from-slate-200 dark:to-primary">
          Todo.easy - your daily todos
        </h1>
        <p className="mt-4 text-xl text-zinc-500">
          Todo.easy is a simple todo app that helps you to manage your daily tasks.
        </p>
        {session && (
          <Link href="/todos">
            <Button className="mt-12" variant="default" size="lg">
              Get Started
            </Button>
          </Link>
        )}

        {!session && (
          <Link href="/signin">
            <Button className="mt-12" variant="default" size="lg">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
