"use client";

import { useState } from "react";
import { Button } from "./ui";
import { Field, Input, Select, Textarea, Checkbox } from "./form";
import { CheckIcon, PhoneIcon } from "./icons";
import { clinic } from "@/lib/clinic";

type Errors = Record<string, string>;

const reasons = [
  "Routine check-up / health check",
  "Vaccination or booster",
  "My pet is unwell",
  "Repeat prescription",
  "Neutering enquiry",
  "Dental",
  "Something else",
];

const times = ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Late afternoon (4pm–7pm)"];

export function BookForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    const required: Record<string, string> = {
      ownerName: "Please tell us your name",
      phone: "We'll need a number to confirm your slot",
      petName: "Which pet is this for?",
      reason: "Please choose a reason",
      date: "Pick a preferred date",
    };
    for (const [name, message] of Object.entries(required)) {
      if (!String(data.get(name) ?? "").trim()) next[name] = message;
    }
    const isClient = data.get("isClient");
    if (!isClient) {
      next.isClient = "Please confirm — or register first if you're new";
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl bg-paper p-8 text-center shadow-sm ring-1 ring-forest-100 sm:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-600">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold text-forest-800">
          Request received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Thanks — we&apos;ll call you shortly to confirm a time that works. If
          your pet needs urgent attention, please phone us on{" "}
          <a href={clinic.phone.mainHref} className="font-semibold text-forest-700">
            {clinic.phone.main}
          </a>
          .
        </p>
        <p className="mt-6 text-sm text-muted">
          This is a demo form — no booking was actually made.
        </p>
        <Button
          variant="ghost"
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setErrors({});
          }}
        >
          Make another request
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-3xl bg-paper p-6 shadow-sm ring-1 ring-forest-100 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="ownerName" required error={errors.ownerName}>
          <Input
            id="ownerName"
            name="ownerName"
            autoComplete="name"
            aria-invalid={!!errors.ownerName}
            placeholder="Sam Taylor"
          />
        </Field>
        <Field label="Phone number" htmlFor="phone" required error={errors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            placeholder="07123 456789"
          />
        </Field>
        <Field label="Pet's name" htmlFor="petName" required error={errors.petName}>
          <Input
            id="petName"
            name="petName"
            aria-invalid={!!errors.petName}
            placeholder="Bramble"
          />
        </Field>
        <Field label="Reason for visit" htmlFor="reason" required error={errors.reason}>
          <Select id="reason" name="reason" aria-invalid={!!errors.reason} defaultValue="">
            <option value="" disabled>
              Choose…
            </option>
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Preferred date" htmlFor="date" required error={errors.date}>
          <Input
            id="date"
            name="date"
            type="date"
            min={today}
            aria-invalid={!!errors.date}
          />
        </Field>
        <Field label="Preferred time" htmlFor="time">
          <Select id="time" name="time" defaultValue={times[0]}>
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label="Anything else we should know?"
        htmlFor="notes"
        className="mt-5"
      >
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Symptoms, a preferred vet, or anything that helps us prepare."
        />
      </Field>

      <div className="mt-6">
        <Field label="" htmlFor="isClient" error={errors.isClient}>
          <Checkbox
            id="isClient"
            name="isClient"
            aria-invalid={!!errors.isClient}
            label={
              <>
                I&apos;m already registered at {clinic.shortName}.{" "}
                <span className="text-muted">
                  New here? Please{" "}
                  <a href="/register" className="font-semibold text-forest-700 underline">
                    register first
                  </a>
                  .
                </span>
              </>
            }
          />
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto">
        Request this appointment
      </Button>

      <p className="mt-5 flex items-center gap-2 text-sm text-muted">
        <PhoneIcon className="h-4 w-4 text-forest-500" />
        In a hurry or it&apos;s urgent? Call us on{" "}
        <a href={clinic.phone.mainHref} className="font-semibold text-forest-700">
          {clinic.phone.main}
        </a>
        .
      </p>
    </form>
  );
}
