import { auth } from "@/auth";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <section className="py-32 text-left">
      <Container>
        <div className="flex items-center justify-center gap-10">
          <div className="max-w-[600px]">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Organize & Track with Todo.easy</h1>
            <p className="mt-4 tracking-tight opacity-70 text-lg">
              Transform your productivity with Todo.easy - the intuitive task management solution designed for modern
              life. Create and track your tasks effortlessly while staying focused on what matters most.
            </p>
            <Link href={session ? "/todos" : "/signin"}>
              <Button className="mt-8" variant="default" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="w-1/2">Image</div>
        </div>
      </Container>
    </section>
  );
}
