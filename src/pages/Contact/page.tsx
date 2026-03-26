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
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Section } from "@/components/section/Section";
import { SectionHeading } from "@/components/section/SectionHeading";
import { fadeUp, revealViewport } from "@/lib/motion";

export default function Contact() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement | null>(null);
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as
    | string
    | undefined;
  const [state, handleSubmit, reset] = useForm(formspreeEndpoint ?? "");

  const revealState = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };

  useEffect(() => {
    if (state.succeeded) {
      toast.success(t("contact.toastSuccess"), {
        id: "contact-success",
      });
      formRef.current?.reset();
      reset();
    }
  }, [state.succeeded, reset, t]);

  return (
    <Section id="contact">
      <SectionHeading
        overline={t("contact.overline")}
        title={t("contact.title")}
      />

      <motion.div variants={fadeUp(0.08)} {...revealState}>
        <Card className="border-border/60 bg-card/45 shadow-background mx-auto w-full max-w-3xl rounded-2xl border py-6 shadow-md">
          <CardHeader className="px-6">
            <CardTitle className="text-base">
              {t("contact.cardTitle")}
            </CardTitle>
            <CardDescription>{t("contact.cardDescription")}</CardDescription>
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
                    <Label htmlFor="name">{t("contact.fields.name")}</Label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder={t("contact.fields.namePlaceholder")}
                      className="h-10 rounded-lg"
                      required
                    />
                  </div>
                  <div className="w-full space-y-2 md:flex-1">
                    <Label htmlFor="email">{t("contact.fields.email")}</Label>
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
                      prefix={t("contact.fields.email")}
                      field="email"
                      errors={state.errors}
                      className="text-destructive/90 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.fields.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t("contact.fields.messagePlaceholder")}
                    className="min-h-28 rounded-lg"
                    required
                  />
                  <ValidationError
                    prefix={t("contact.fields.message")}
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
                  {state.submitting
                    ? t("contact.buttons.sending")
                    : t("contact.buttons.send")}
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
                    {t("contact.buttons.linkedin")}
                  </a>
                </Button>
              </div>
            </form>
            {!formspreeEndpoint && (
              <p className="text-destructive/90 mt-4 text-center text-xl font-semibold">
                {t("contact.fallback")}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  );
}
