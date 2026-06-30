"use client";

import { useState } from "react";
import { Button } from "./ui";
import { Field, Input, Select, Textarea, Checkbox, Fieldset } from "./form";
import { CheckIcon, PawIcon } from "./icons";
import { clinic } from "@/lib/clinic";
import { content } from "@/lib/content";

type Errors = Record<string, string>;

const species = ["Dog", "Cat", "Rabbit", "Other small pet"];

export function RegisterForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    const required: Record<string, string> = {
      ownerName: "Please tell us your name",
      email: "We need an email to confirm your registration",
      phone: "A contact number, please",
      petName: "What's your pet called?",
      species: "Please choose a species",
    };
    for (const [name, message] of Object.entries(required)) {
      if (!String(data.get(name) ?? "").trim()) next[name] = message;
    }

    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "That doesn't look like a valid email";
    }
    if (!data.get("recordsConsent")) {
      next.recordsConsent =
        "We need your consent to request your pet's records";
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
      // Focus the first field with an error.
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
          Welcome to {clinic.shortName}! 🐾
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          {content.register.successBody}
        </p>
        <p className="mt-6 text-sm text-muted">
          This is a demo form — no details were actually submitted or stored.
        </p>
        <Button
          variant="ghost"
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setErrors({});
          }}
        >
          Register another pet
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
      <div className="mb-7 flex items-center gap-3 rounded-2xl bg-forest-50 px-5 py-4 text-sm text-forest-700 ring-1 ring-forest-100">
        <PawIcon className="h-5 w-5 shrink-0" />
        <span>
          It takes about two minutes. Fields marked{" "}
          <span className="font-semibold text-coral-600">*</span> are required.
        </span>
      </div>

      <Fieldset legend="About you">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your full name" htmlFor="ownerName" required error={errors.ownerName}>
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
          <Field label="Email address" htmlFor="email" required error={errors.email}>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              placeholder="alex@example.com"
            />
          </Field>
          <Field
            label="Postcode"
            htmlFor="postcode"
            hint="So we can check you're in our catchment"
          >
            <Input
              id="postcode"
              name="postcode"
              autoComplete="postal-code"
              placeholder="CB6 2HT"
            />
          </Field>
        </div>
      </Fieldset>

      <div className="mt-8">
        <Fieldset legend="About your pet">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Pet's name" htmlFor="petName" required error={errors.petName}>
              <Input
                id="petName"
                name="petName"
                aria-invalid={!!errors.petName}
                placeholder="Bramble"
              />
            </Field>
            <Field label="Species" htmlFor="species" required error={errors.species}>
              <Select id="species" name="species" aria-invalid={!!errors.species} defaultValue="">
                <option value="" disabled>
                  Choose…
                </option>
                {species.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Breed" htmlFor="breed">
              <Input id="breed" name="breed" placeholder="Labrador" />
            </Field>
            <Field label="Age (approx.)" htmlFor="age">
              <Input id="age" name="age" placeholder="3 years" />
            </Field>
          </div>
        </Fieldset>
      </div>

      <div className="mt-8">
        <Fieldset
          legend="Your previous vet"
          description="If you're moving from another practice, we'll request your pet's history for you — no need to chase it yourself."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Previous practice name" htmlFor="prevVetName">
              <Input
                id="prevVetName"
                name="prevVetName"
                placeholder="e.g. Fenland Vets, Ely"
              />
            </Field>
            <Field
              label="Their phone or town"
              htmlFor="prevVetContact"
              hint="Anything that helps us find them"
            >
              <Input
                id="prevVetContact"
                name="prevVetContact"
                placeholder="0161 234 5678"
              />
            </Field>
          </div>
          <Field
            label="Anything we should know?"
            htmlFor="notes"
            className="mt-5"
            hint="Ongoing conditions, medication, anxieties — optional"
          >
            <Textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Bramble is a little nervous at the vet and is on daily joint supplements."
            />
          </Field>
        </Fieldset>
      </div>

      <div className="mt-8 space-y-4 border-t border-forest-100 pt-7">
        <Field label="" htmlFor="recordsConsent" error={errors.recordsConsent}>
          <Checkbox
            id="recordsConsent"
            name="recordsConsent"
            aria-invalid={!!errors.recordsConsent}
            label={
              <>
                I authorise {clinic.name} to request my pet&apos;s clinical
                history from my previous vet.{" "}
                <span className="text-coral-600">*</span>
              </>
            }
          />
        </Field>
        <Checkbox
          id="marketingConsent"
          name="marketingConsent"
          label="Email me occasional health reminders and practice news. (No more than monthly — unsubscribe any time.)"
        />
      </div>

      <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto">
        Complete registration
      </Button>
    </form>
  );
}
