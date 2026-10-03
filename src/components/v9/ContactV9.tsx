'use client';

import React, { useId, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { contactSchema } from '@/lib/forms/schemas';
import { debug } from '@/lib/debug';
import he from '@/locales/v8-he.json';
import heV9 from '@/locales/v9-he.json';

/*
 * Two Otters v8 contact section, with motion.
 * Same language as ContactV8 on the live site:
 *   white ground; the navy #1D2332 wave (footer-wave.svg) rises from the bottom edge
 *   and runs straight into the navy footer below
 *   standing photo of Amir and Keren on the left, tilted -5deg, tucked under the form card
 *   heading 900 #0b0b0b, white card (1px rgba(0,0,0,.14), radius 32, padding 40)
 *   fields radius 20, h 53.5, green focus border; full width green #5aff00 pill button
 *   three green trust items with checks, sitting on the navy
 * Motion, one orchestrated moment: the navy wave builds up out of the footer,
 * the photo is revealed bottom to top while it settles into its tilt, the heading and
 * card rise, and the trust checks draw themselves right to left once the navy is under them.
 * The form posts to /api/forms/contact like ContactV8, and validates with the same zod
 * schema the server runs, so the client and server can never disagree about what is valid.
 */

type ContactCopy = {
  title: string;
  sub: string;
  photoAlt: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  companyPlaceholder: string;
  phonePlaceholder: string;
  rolePlaceholder: string;
  messagePlaceholder: string;
  submitBtn: string;
  sendingBtn: string;
  successMsg: string;
  errorMsg: string;
  trust: string[];
};

const CONTACT_DEFAULT_COPY: ContactCopy = he.contact;

/* The live form leans on the browser's own `required` bubbles, so it has no per-field
   copy. These map the schema's error codes (which are also the API's) to Hebrew. */
const CONTACT_ERRORS: Record<string, string> = heV9.contact.errors;
const CONTACT_FIELD_ORDER = ['name', 'email', 'message'] as const;
/** Which field each of the schema's error codes belongs to. */
const CONTACT_CODE_FIELD: Record<string, 'name' | 'email' | 'message'> = {
  name_required: 'name',
  invalid_email: 'email',
  disposable_email: 'email',
  message_required: 'message',
};

const CONTACT_EASE = [0.22, 1, 0.36, 1] as const;
const CONTACT_BUILD = [0.65, 0, 0.35, 1] as const;

type ContactFormState = { name: string; email: string; phone: string; company: string; role: string; message: string };
type ContactFieldName = keyof ContactFormState;
type ContactErrors = Partial<Record<ContactFieldName, string>>;

const CONTACT_EMPTY: ContactFormState = { name: '', email: '', phone: '', company: '', role: '', message: '' };

/** The schema's first issue per field, as Hebrew copy. */
function contactValidate(f: ContactFormState): ContactErrors {
  const parsed = contactSchema.safeParse(f);
  if (parsed.success) return {};
  const e: ContactErrors = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0] as ContactFieldName;
    if (!e[field]) e[field] = CONTACT_ERRORS[issue.message] ?? issue.message;
  }
  return e;
}

const contactRise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: CONTACT_EASE } }),
};

const CONTACT_FIELD_CLASS =
  'block w-full rounded-[20px] border bg-white px-[18px] text-right text-[0.9375rem] text-black outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(0,0,0,0.62)] focus:border-[#43c400] focus:shadow-[0_0_0_3px_rgba(90,255,0,0.18)]';

function ContactField({
  name,
  label,
  value,
  error,
  onChange,
  type = 'text',
  required = false,
  multiline = false,
  autoComplete,
  inputMode,
  fieldRef,
}: {
  name: ContactFieldName;
  label: string;
  value: string;
  error?: string;
  onChange: (name: ContactFieldName, value: string) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel';
  fieldRef?: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
}) {
  const id = useId();
  const errId = `${id}-err`;
  const border = error ? 'border-[#dc2626]' : 'border-[rgba(0,0,0,0.2)]';
  const common = {
    id,
    name,
    value,
    placeholder: label,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errId : undefined,
    'aria-required': required || undefined,
    autoComplete,
  };

  return (
    <div className="min-w-0">
      {/* Placeholder-only look as on the live site; the label is there for screen readers */}
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {multiline ? (
        <textarea
          {...common}
          ref={fieldRef}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${CONTACT_FIELD_CLASS} ${border} h-[120px] resize-y py-3.5`}
        />
      ) : (
        <input
          {...common}
          ref={fieldRef}
          type={type}
          inputMode={inputMode}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${CONTACT_FIELD_CLASS} ${border} h-[53.5px]`}
        />
      )}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            key={error}
            id={errId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: CONTACT_EASE }}
            className="m-0 overflow-hidden px-[18px] pt-1.5 text-right text-[0.8125rem] leading-snug text-[#dc2626]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* A check drawn right to left: from the long arm's tip, down to the vertex, up the short arm. */
function ContactCheck({ delay, size = 16, stroke = '#5aff00' }: { delay: number; size?: number; stroke?: string }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0">
      <motion.path
        d="M20 6 L9.5 16.5 L4 11"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0 },
          show: { pathLength: 1, transition: { duration: 0.5, delay, ease: CONTACT_BUILD } },
        }}
      />
    </svg>
  );
}

export default function ContactV9({
  copy = CONTACT_DEFAULT_COPY,
  photo = '/contact-photo.jpg',
}: {
  copy?: ContactCopy;
  photo?: string;
}) {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<ContactFormState>(CONTACT_EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');
  const fieldEls = useRef<Partial<Record<ContactFieldName, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  // The general failure copy, or the bot-check one when the server answers `blocked`.
  const [failure, setFailure] = useState('');

  const setField = (name: ContactFieldName, value: string) => {
    const next = { ...form, [name]: value };
    setForm(next);
    if (status === 'success' || status === 'error') setStatus('idle');
    // After a first failed submit, errors clear as soon as the field is fixed.
    if (tried) setErrors(contactValidate(next));
  };

  const refFor = (name: ContactFieldName) => (el: HTMLInputElement | HTMLTextAreaElement | null) => {
    fieldEls.current[name] = el;
  };

  const focusFirst = (found: ContactErrors) => {
    const first = CONTACT_FIELD_ORDER.find((k) => found[k]);
    if (first) fieldEls.current[first]?.focus();
    return Boolean(first);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setTried(true);
    const found = contactValidate(form);
    setErrors(found);
    if (focusFirst(found)) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus('success');
        setForm(CONTACT_EMPTY);
        setTried(false);
        setErrors({});
        return;
      }
      const code: string | undefined = data?.error;
      // A field code means the server's schema caught something ours let through.
      const target = code ? CONTACT_CODE_FIELD[code] : undefined;
      if (code && target) {
        const next = { [target]: CONTACT_ERRORS[code] ?? copy.errorMsg };
        setErrors(next);
        focusFirst(next);
        setStatus('idle');
        return;
      }
      setFailure(code === 'blocked' ? CONTACT_ERRORS.blocked : copy.errorMsg);
      setStatus('error');
    } catch (err) {
      debug('Contact form submit failed:', err);
      setFailure(copy.errorMsg);
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <motion.section
      id="contact"
      dir="rtl"
      lang="he"
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden bg-white px-10 pb-[150px] pt-[90px] max-[900px]:pb-[70px] max-[600px]:px-5 max-[600px]:pb-[60px] max-[600px]:pt-14"
      style={{ fontFamily: "'Google Sans', Arial, sans-serif" }}
    >
      {/* Navy wave: a background layer only. It builds up from the bottom edge, out of the footer. */}
      <motion.div
        aria-hidden
        variants={{
          hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, delay: 0.1, ease: CONTACT_BUILD } },
        }}
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-[500px] w-full max-[900px]:h-[300px]"
      >
        <div
          className="h-full w-full max-[900px]:hidden"
          style={{ background: "url('/footer-wave.svg') center bottom / 100% 100% no-repeat" }}
        />
        <div
          className="hidden h-full w-full max-[900px]:block"
          style={{ background: "url('/footer-wave-mobile.svg') center bottom / 100% 100% no-repeat" }}
        />
      </motion.div>

      {/* Row pinned left to right so the photo stays on the visual left, as on the live site */}
      <div
        dir="ltr"
        className="relative z-[2] mx-auto flex w-full max-w-[1100px] items-start justify-center max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-6"
      >
        <motion.img
          src={photo}
          alt={copy.photoAlt}
          draggable={false}
          variants={{
            // Revealed bottom to top while it settles into the tilt. The clip runs past the
            // edges at the end so the photo's soft shadow is not cut off.
            hidden: { clipPath: 'inset(115% -15% -15% -15%)', rotate: 0, y: 30 },
            show: {
              clipPath: 'inset(-15% -15% -15% -15%)',
              rotate: -5,
              y: 0,
              transition: {
                clipPath: { duration: 1.0, delay: 0.25, ease: CONTACT_BUILD },
                rotate: { duration: 1.3, delay: 0.35, ease: CONTACT_EASE },
                y: { duration: 1.1, delay: 0.25, ease: CONTACT_EASE },
              },
            },
          }}
          className="relative z-[1] mr-[-70px] mt-[70px] block h-auto w-[44%] flex-[0_0_44%] rounded-[20px] shadow-[0_24px_48px_rgba(0,0,0,0.15)] max-[900px]:m-0 max-[900px]:mx-auto max-[900px]:w-[min(72%,340px)] max-[900px]:flex-none"
        />

        <div dir="rtl" className="relative z-[2] min-w-0 max-w-[620px] flex-[1_1_auto] max-[900px]:w-full max-[900px]:max-w-[600px]">
          <div className="mb-[22px] pr-3 text-right max-[900px]:p-0 max-[900px]:text-center">
            <motion.h2
              variants={contactRise}
              custom={0.15}
              className="m-0 mb-3 text-[clamp(2rem,3vw,2.75rem)] font-black leading-[1.7] text-[#0b0b0b]"
            >
              {copy.title}
            </motion.h2>
            <motion.p variants={contactRise} custom={0.25} className="m-0 text-[1.125rem] leading-[1.7] text-[#0b0b0b]">
              {copy.sub}
            </motion.p>
          </div>

          <motion.form
            variants={contactRise}
            custom={0.35}
            noValidate
            onSubmit={handleSubmit}
            aria-busy={sending}
            className="relative mb-[22px] flex w-full flex-col gap-4 rounded-[32px] border border-[rgba(0,0,0,0.14)] bg-white p-10 max-[600px]:rounded-[24px] max-[600px]:px-5 max-[600px]:py-7"
          >
            {/* Hidden from people, irresistible to bots (kept from the live form) */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
              <ContactField name="name" label={copy.namePlaceholder} value={form.name} error={errors.name} onChange={setField} required autoComplete="name" fieldRef={refFor('name')} />
              <ContactField name="email" type="email" inputMode="email" label={copy.emailPlaceholder} value={form.email} error={errors.email} onChange={setField} required autoComplete="email" fieldRef={refFor('email')} />
            </div>
            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
              <ContactField name="company" label={copy.companyPlaceholder} value={form.company} onChange={setField} autoComplete="organization" />
              <ContactField name="phone" type="tel" inputMode="tel" label={copy.phonePlaceholder} value={form.phone} onChange={setField} autoComplete="tel" />
            </div>
            <ContactField name="role" label={copy.rolePlaceholder} value={form.role} onChange={setField} autoComplete="organization-title" />
            <ContactField name="message" multiline label={copy.messagePlaceholder} value={form.message} error={errors.message} onChange={setField} required fieldRef={refFor('message')} />

            <button
              type="submit"
              disabled={sending}
              className="relative w-full cursor-pointer overflow-hidden rounded-full border-0 bg-[#5aff00] px-6 py-4 font-[inherit] text-[1.125rem] font-extrabold text-[#0b0b0b] transition-colors duration-200 hover:bg-[#4ee600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#0b0b0b] disabled:cursor-default"
            >
              {/* While sending, a darker green fills the pill right to left */}
              {sending && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 origin-right bg-[#4ee600]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduce ? 0 : 1.3, ease: CONTACT_BUILD }}
                />
              )}
              <span className="relative">{sending ? copy.sendingBtn : copy.submitBtn}</span>
            </button>

            <div className="empty:hidden">
              <AnimatePresence initial={false}>
                {status === 'success' && (
                  <motion.p
                    key="ok"
                    role="status"
                    initial={reduce ? false : 'hidden'}
                    animate="show"
                    exit={{ opacity: 0 }}
                    variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: CONTACT_EASE } } }}
                    className="m-0 mt-1 flex items-center justify-center gap-2 text-center text-[0.9375rem] leading-[1.4] text-[#16a34a]"
                  >
                    <ContactCheck delay={0.15} size={18} stroke="#16a34a" />
                    <span>{copy.successMsg}</span>
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    key="err"
                    role="alert"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="m-0 mt-1 text-center text-[0.9375rem] leading-[1.4] text-[#dc2626]"
                  >
                    {failure || copy.errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-7 p-0">
            {copy.trust.map((item, i) => (
              <motion.li
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.0 + i * 0.14, ease: CONTACT_EASE } },
                }}
                className="flex items-center gap-1.5 text-[0.9375rem] font-semibold text-[#5aff00]"
              >
                <ContactCheck delay={1.1 + i * 0.14} />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
