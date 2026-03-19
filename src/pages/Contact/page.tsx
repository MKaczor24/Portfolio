import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col gap-2">
          <p className="text-primary mt-4 text-sm tracking-[0.18em] uppercase">
            Contact
          </p>
          <h2 className="text-foreground text-3xl font-semibold sm:text-4xl">
            Let's build something useful
          </h2>
        </div>

        <Card className="border-border/60 bg-card/45 shadow-background mx-auto w-full max-w-3xl rounded-2xl border py-6 shadow-lg">
          <CardHeader className="px-6">
            <CardTitle className="text-base">Quick message</CardTitle>
            <CardDescription>
              Leave a short note and I will get back to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    className="h-10 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-10 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your idea"
                  className="min-h-28 rounded-lg"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild className="rounded-lg px-4">
                  <a href="mailto:michal.kaczor.dev@gmail.com">Send Email</a>
                </Button>
                <Button asChild variant="outline" className="rounded-lg px-4">
                  <a
                    href="https://www.linkedin.com/in/micha%C5%82-kaczor-8616863a4/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
