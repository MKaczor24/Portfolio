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
import { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { toast } from "sonner";
import { Section } from "@/components/section/Section";
import { SectionHeading } from "@/components/section/SectionHeading";

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as
    | string
    | undefined;
  const [state, handleSubmit, reset] = useForm(formspreeEndpoint ?? "");

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message sent successfully! I'll get back to you soon.", {
        id: "contact-success",
      });
      formRef.current?.reset();
      reset();
    }
  }, [state.succeeded, reset]);

  return (
    <Section id="contact">
      <SectionHeading overline="Contact" title="Let's build something useful" />

      <Card className="section-reveal border-border/60 bg-card/45 shadow-background mx-auto w-full max-w-3xl rounded-2xl border py-6 shadow-md [animation-delay:90ms]">
        <CardHeader className="px-6">
          <CardTitle className="text-base">Quick message</CardTitle>
          <CardDescription>
            Leave a short note and I will get back to you.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <form
            ref={formRef}
            className="space-y-4"
            onSubmit={handleSubmit}
            aria-busy={state.submitting}
          >
            <fieldset disabled={state.submitting} className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="w-full space-y-2 md:flex-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    className="h-10 rounded-lg"
                    required
                  />
                </div>
                <div className="w-full space-y-2 md:flex-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-10 rounded-lg"
                    required
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-destructive/90 text-sm"
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
                  required
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-destructive/90 text-sm"
                />
              </div>

              <ValidationError
                prefix=""
                errors={state.errors}
                className="text-destructive/90 text-sm"
              />
            </fieldset>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Button
                type="submit"
                className="w-full rounded-lg px-4 sm:w-auto"
                disabled={state.submitting || !formspreeEndpoint}
              >
                {state.submitting ? "Sending..." : "Send Email"}
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-lg px-4 sm:w-auto"
              >
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
    </Section>
  );
}
