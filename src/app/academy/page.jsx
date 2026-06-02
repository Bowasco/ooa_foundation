"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
// ── DESIGN TOKENS (mirrored from original CSS variables) ──────────
const C = {
  navy: "#1B3A6B",
  navyDeep: "#0F2347",
  navyMid: "#2A4F8F",
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  goldPale: "#FBF5E6",
  cream: "#FAF7F2",
  creamDark: "#F0EBE0",
  mid: "#4A5568",
  green: "#1A6B3A",
  greenLight: "#E8F5EE",
  red: "#C0392B",
  redLight: "#FDF0EF",
  border: "#D4C9B0",
};

// ── SMALL COMPONENTS ──────────────────────────────────────────────

function Req() {
  return <span style={{ color: C.red, marginLeft: 2 }}>*</span>;
}

function Opt({ label = "optional" }) {
  return (
    <span
      style={{
        color: C.mid,
        fontWeight: 400,
        textTransform: "none",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: 0,
        fontSize: 11,
      }}
    >
      ({label})
    </span>
  );
}

function FieldLabel({ children }) {
  return (
    <label
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: C.navy,
        letterSpacing: "0.3px",
        textTransform: "uppercase",
        fontFamily: "'DM Mono', monospace",
        display: "block",
        marginBottom: 6,
      }}
    >
      {children}
    </label>
  );
}

function TextInput({
  id,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
  readOnly,
  style,
  min,
  max,
}) {
  const [touched, setTouched] = useState(false);
  const invalid = required && touched && !value?.trim();
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      required={required}
      readOnly={readOnly}
      min={min}
      max={max}
      onBlur={() => setTouched(true)}
      style={{
        width: "100%",
        padding: "11px 14px",
        border: `1.5px solid ${invalid ? C.red : value?.trim() && required ? C.green : C.border}`,
        borderRadius: 8,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: "#1A1A2E",
        background: invalid ? C.redLight : readOnly ? "#e8e8e8" : C.cream,
        outline: "none",
        transition: "all .2s",
        boxSizing: "border-box",
        WebkitAppearance: "none",
        ...style,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = C.navy;
        e.target.style.background = "#fff";
        e.target.style.boxShadow = `0 0 0 3px rgba(27,58,107,0.1)`;
      }}
      onBlurCapture={(e) => {
        e.target.style.boxShadow = "none";
        e.target.style.background = invalid
          ? C.redLight
          : readOnly
            ? "#e8e8e8"
            : C.cream;
      }}
    />
  );
}

function SelectInput({ id, name, value, onChange, required, children }) {
  const [touched, setTouched] = useState(false);
  const invalid = required && touched && !value;
  return (
    <select
      id={id}
      name={name}
      value={value || ""}
      onChange={onChange}
      required={required}
      onBlur={() => setTouched(true)}
      style={{
        width: "100%",
        padding: "11px 36px 11px 14px",
        border: `1.5px solid ${invalid ? C.red : value && required ? C.green : C.border}`,
        borderRadius: 8,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: "#1A1A2E",
        background: `${invalid ? C.redLight : C.cream} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%231B3A6B' d='M1 1l5 5 5-5'/%3E%3C/svg%3E") no-repeat right 14px center`,
        outline: "none",
        cursor: "pointer",
        WebkitAppearance: "none",
        boxSizing: "border-box",
      }}
    >
      {children}
    </select>
  );
}

function Textarea({
  id,
  name,
  value,
  onChange,
  required,
  placeholder,
  rows = 3,
  maxLength,
}) {
  return (
    <div style={{ position: "relative" }}>
      <textarea
        id={id}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        style={{
          width: "100%",
          padding: "11px 14px 28px",
          border: `1.5px solid ${C.border}`,
          borderRadius: 8,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "#1A1A2E",
          background: C.cream,
          outline: "none",
          resize: "vertical",
          minHeight: 90,
          boxSizing: "border-box",
          transition: "all .2s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = C.navy;
          e.target.style.background = "#fff";
          e.target.style.boxShadow = `0 0 0 3px rgba(27,58,107,0.1)`;
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = "none";
          e.target.style.background = C.cream;
        }}
      />
      {maxLength && (
        <span
          style={{
            position: "absolute",
            bottom: 8,
            right: 10,
            fontSize: 10,
            color: C.mid,
            fontFamily: "'DM Mono', monospace",
            pointerEvents: "none",
          }}
        >
          {(value || "").length}/{maxLength}
        </span>
      )}
    </div>
  );
}

function RadioGroup({ name, options, value, onChange, cols = "auto-fill" }) {
  const gridStyle =
    cols === 2
      ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }
      : {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 8,
        };
  return (
    <div style={gridStyle}>
      {options.map((opt) => (
        <label
          key={opt}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            border: `1.5px solid ${value === opt ? C.navy : C.border}`,
            borderRadius: 8,
            cursor: "pointer",
            transition: "all .18s",
            background: value === opt ? "#EDF2F7" : C.cream,
            fontSize: 13,
          }}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            style={{
              width: 16,
              height: 16,
              accentColor: C.navy,
              cursor: "pointer",
            }}
          />
          <span
            style={{
              color: value === opt ? C.navy : "#1A1A2E",
              fontWeight: value === opt ? 600 : 400,
            }}
          >
            {opt}
          </span>
        </label>
      ))}
    </div>
  );
}

function CheckboxItem({ id, checked, onChange, children }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "12px 16px",
        background: checked ? "#EDF2F7" : "#fff",
        borderRadius: 8,
        border: `1.5px solid ${checked ? C.navy : C.border}`,
        fontSize: 13,
        lineHeight: 1.5,
        color: "#1A1A2E",
        cursor: "pointer",
        transition: "all .2s",
        marginTop: 4,
      }}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        style={{
          width: 18,
          height: 18,
          minWidth: 18,
          marginTop: 2,
          accentColor: C.navy,
          cursor: "pointer",
        }}
      />
      <span>{children}</span>
    </label>
  );
}

function FieldGrid({ cols = 2, children }) {
  const template = cols === 1 ? "1fr" : cols === 3 ? "1fr 1fr 1fr" : "1fr 1fr";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: template,
        gap: 16,
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  );
}

function FieldGroup({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {children}
    </div>
  );
}

function FieldHint({ children }) {
  return (
    <p
      style={{ fontSize: 11, color: C.mid, marginTop: -2, fontStyle: "italic" }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: `1px dashed ${C.border}`,
        margin: "20px 0",
      }}
    />
  );
}

// ── SECTION WRAPPER ───────────────────────────────────────────────
function Section({ id, letter, title, desc, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        marginBottom: 20,
        overflow: "hidden",
        boxShadow: `0 2px 16px rgba(27,58,107,0.12)`,
      }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          background: C.navy,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          cursor: "pointer",
          userSelect: "none",
          transition: "background .2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = C.navyMid)}
        onMouseLeave={(e) => (e.currentTarget.style.background = C.navy)}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: C.gold,
            color: C.navyDeep,
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {letter}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.55)",
              marginTop: 2,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.5px",
            }}
          >
            {desc}
          </div>
        </div>
        <span
          style={{
            color: C.gold,
            fontSize: 18,
            transition: "transform .3s",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▾
        </span>
      </div>
      {open && <div style={{ padding: "28px 24px" }}>{children}</div>}
    </div>
  );
}

// ── TRACK CARD ────────────────────────────────────────────────────
function TrackCard({ emoji, name, desc, value, selected, onSelect }) {
  return (
    <label
      onClick={onSelect}
      style={{
        border: `2px solid ${selected ? C.navy : C.border}`,
        borderRadius: 8,
        padding: 16,
        cursor: "pointer",
        background: selected ? "#EDF2F7" : C.cream,
        transition: "all .2s",
        position: "relative",
        display: "block",
      }}
    >
      <input
        type="radio"
        name="track"
        value={value}
        checked={selected}
        onChange={onSelect}
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          width: 18,
          height: 18,
          accentColor: C.navy,
        }}
      />
      <span style={{ fontSize: 24, marginBottom: 8, display: "block" }}>
        {emoji}
      </span>
      <div
        style={{
          fontWeight: 700,
          color: C.navy,
          fontSize: 14,
          marginBottom: 4,
        }}
      >
        {name}
      </div>
      <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.4 }}>{desc}</div>
    </label>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────
export default function AriseAcademy() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refNum, setRefNum] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [progress, setProgress] = useState(0);
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // ── FORM STATE ───────────────────────────────────────────────
  const [form, setForm] = useState({
    // A
    surname: "",
    firstname: "",
    dob: "",
    gender: "",
    marital: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    community: "",
    stateorigin: "",
    landmark: "",
    // B
    emname: "",
    emrel: "",
    emphone: "",
    emwhatsapp: "",
    emaddress: "",
    // C
    education: "",
    lastschool: "",
    schoolyear: "",
    hasCert: "",
    certdetails: "",
    // D
    employment: "",
    currentwork: "",
    dependants: "",
    // E
    track: "",
    priorExp: "",
    priorExpDesc: "",
    // F
    whyApply: "",
    businessIdea: "",
    biggestChallenge: "",
    market: "",
    equipment: "",
    // G
    availability: "",
    medical: "",
    medicalDetails: "",
    referral: "",
    // H
    dec1: false,
    dec2: false,
    dec3: false,
    signname: "",
  });

  const set = (field) => (e) => {
    const val = e.target
      ? e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value
      : e;
    setForm((f) => ({ ...f, [field]: val }));
  };

  // ── PROGRESS ─────────────────────────────────────────────────
  useEffect(() => {
    const required = [
      form.surname,
      form.firstname,
      form.dob,
      form.gender,
      form.phone,
      form.whatsapp,
      form.address,
      form.community,
      form.emname,
      form.emrel,
      form.emphone,
      form.education,
      form.employment,
      form.track,
      form.priorExp,
      form.whyApply,
      form.businessIdea,
      form.availability,
      form.medical,
      form.referral,
    ];
    const checkboxes = [form.dec1, form.dec2, form.dec3];
    const textFields = required.filter(
      (v) => typeof v === "string" && v.trim(),
    );
    const cbFields = checkboxes.filter(Boolean);
    const total = required.length + checkboxes.length + (form.signname ? 0 : 1);
    const done =
      textFields.length + cbFields.length + (form.signname.trim() ? 1 : 0);
    setProgress(
      Math.round((done / (required.length + checkboxes.length + 1)) * 100),
    );
  }, [form]);

  // ── SUBMIT ───────────────────────────────────────────────────
  async function handleSubmit() {
    const required = [
      form.surname,
      form.firstname,
      form.dob,
      form.gender,
      form.phone,
      form.whatsapp,
      form.address,
      form.community,
      form.emname,
      form.emrel,
      form.emphone,
      form.education,
      form.employment,
      form.track,
      form.priorExp,
      form.whyApply,
      form.businessIdea,
      form.availability,
      form.medical,
      form.referral,
      form.signname,
    ];
    const allText = required.every((v) => typeof v === "string" && v.trim());
    const allCB = form.dec1 && form.dec2 && form.dec3;

    if (!allText || !allCB) {
      setValidationError(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setValidationError(false);
    setSubmitting(true); // add this state (see note below)

    // Generate reference number
    const rand = Math.floor(1000 + Math.random() * 9000);
    const trackCode = form.track ? form.track.charAt(6) : "X";
    const generatedRef = `OAAF/AA/${new Date().getFullYear()}/${trackCode}/${rand}`;

    try {
      const { error } = await supabase
        .from("arise_academy_applications")
        .insert([
          {
            surname: form.surname.trim(),
            firstname: form.firstname.trim(),
            dob: form.dob,
            gender: form.gender,
            marital: form.marital,
            phone: form.phone.trim(),
            whatsapp: form.whatsapp.trim(),
            email: form.email.trim().toLowerCase(),
            address: form.address.trim(),
            community: form.community,
            stateorigin: form.stateorigin.trim(),
            landmark: form.landmark.trim(),
            emname: form.emname.trim(),
            emrel: form.emrel,
            emphone: form.emphone.trim(),
            emwhatsapp: form.emwhatsapp.trim(),
            emaddress: form.emaddress.trim(),
            education: form.education,
            lastschool: form.lastschool.trim(),
            schoolyear: form.schoolyear,
            hascert: form.hasCert,
            certdetails: form.certdetails.trim(),
            employment: form.employment,
            currentwork: form.currentwork.trim(),
            dependants: form.dependants,
            track: form.track,
            prior_exp: form.priorExp,
            prior_exp_desc: form.priorExpDesc.trim(),
            why_apply: form.whyApply.trim(),
            business_idea: form.businessIdea.trim(),
            biggest_challenge: form.biggestChallenge.trim(),
            market: form.market,
            equipment: form.equipment,
            availability: form.availability,
            medical: form.medical,
            medical_details: form.medicalDetails.trim(),
            referral: form.referral,
            signname: form.signname.trim(),
            ref_number: generatedRef,
          },
        ]);

      if (error) {
        console.error("Supabase error code:", error.code);
        console.error("Supabase error message:", error.message);
        console.error("Supabase error details:", error.details);
        console.error("Supabase error hint:", error.hint);
        setSubmitting(false);
        return;
      }

      // Success
      setRefNum(generatedRef);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  // ── GOOGLE FONTS ─────────────────────────────────────────────
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const baseStyle = {
    fontFamily: "'DM Sans', sans-serif",
    background: C.cream,
    minHeight: "100vh",
    color: "#1A1A2E",
  };

  // ── SUCCESS SCREEN ────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={baseStyle}>
        <Header />
        <div
          style={{ maxWidth: 860, margin: "0 auto", padding: "40px 16px 80px" }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "60px 24px",
              maxWidth: 600,
              margin: "40px auto",
              background: "#fff",
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              boxShadow: `0 8px 40px rgba(27,58,107,0.12)`,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                background: C.greenLight,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 32,
              }}
            >
              ✅
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 30,
                color: C.navy,
                marginBottom: 12,
                fontWeight: 700,
              }}
            >
              Application Submitted!
            </h2>
            <p
              style={{
                fontSize: 14,
                color: C.mid,
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              Thank you for applying to{" "}
              <strong>The Arise Academy — Cohort 1</strong>. Your application
              has been received by the Ogbeni Olajide Awe Foundation.
            </p>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                background: "#EDF2F7",
                padding: "10px 18px",
                borderRadius: 8,
                color: C.navy,
                display: "inline-block",
                margin: "10px 0 24px",
                letterSpacing: 1,
              }}
            >
              REF: {refNum}
            </div>
            <p
              style={{
                fontSize: 14,
                color: C.mid,
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              Please <strong>save or screenshot your reference number</strong>.
              We will be in touch via WhatsApp or phone within 14 days of the
              application deadline (30th June 2026).
            </p>
            <p style={{ fontSize: 12, color: C.mid, marginTop: 16 }}>
              Applications close 30th June 2026. Shortlisting begins 1st July
              2026. Selections confirmed by 20th July 2026.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 24,
              }}
            >
              <Btn variant="secondary" onClick={() => window.print()}>
                🖨️ Print Confirmation
              </Btn>
              <Btn variant="gold" onClick={() => setShowModal(true)}>
                📥 Save a Copy
              </Btn>
            </div>
          </div>
        </div>
        {showModal && <SaveModal onClose={() => setShowModal(false)} />}
        <Footer />
      </div>
    );
  }

  // ── MAIN FORM ─────────────────────────────────────────────────
  return (
    <div style={baseStyle}>
      <Header />

      {/* Progress Bar */}
      <div
        style={{
          background: C.navy,
          padding: "16px 24px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: 2,
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            Form Progress
          </span>
          <div
            style={{
              flex: 1,
              height: 4,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`,
                borderRadius: 2,
                transition: "width .4s ease",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: C.gold,
              fontWeight: 500,
              minWidth: 36,
              textAlign: "right",
            }}
          >
            {progress}%
          </span>
        </div>
      </div>

      <main
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "32px 16px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Intro Card */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: "28px 32px",
            marginBottom: 28,
            borderLeft: `4px solid ${C.gold}`,
            boxShadow: `0 4px 24px rgba(27,58,107,0.12)`,
          }}
        >
          <p style={{ color: C.mid, fontSize: 14, lineHeight: 1.7 }}>
            Welcome to the official application form for{" "}
            <strong style={{ color: C.navy }}>
              The Arise Academy — Cohort 1
            </strong>
            . This programme offers{" "}
            <strong style={{ color: C.navy }}>
              FREE vocational skills training
            </strong>{" "}
            plus a <strong style={{ color: C.navy }}>seed capital grant</strong>{" "}
            to launch your own business — for young men and women in{" "}
            <strong style={{ color: C.navy }}>
              Ijebu-Jesa and Iwoye-Ijesa, Oriade LGA
            </strong>
            .
          </p>
          <p
            style={{
              color: C.mid,
              fontSize: 14,
              lineHeight: 1.7,
              marginTop: 10,
            }}
          >
            Complete all sections carefully and honestly. All information is{" "}
            <strong style={{ color: C.navy }}>strictly confidential</strong> and
            used only for programme administration.
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#FDF0EF",
              color: C.red,
              fontSize: 12,
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: 6,
              marginTop: 14,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.5px",
            }}
          >
            ⏰ Application Deadline: 30th June 2026
          </div>
        </div>

        {/* Validation Notice */}
        {validationError && (
          <div
            style={{
              background: "#FDF0EF",
              border: `1.5px solid ${C.red}`,
              borderRadius: 8,
              padding: "14px 18px",
              marginBottom: 20,
              fontSize: 13,
              color: C.red,
              fontWeight: 600,
            }}
          >
            ⚠️ Please complete all required fields (marked with *) before
            submitting.
          </div>
        )}

        {/* ── SECTION A ── */}
        <Section
          letter="A"
          title="Personal Information"
          desc="Your basic details and contact information"
          defaultOpen
        >
          <FieldGrid>
            <FieldGroup>
              <FieldLabel>
                Surname <Req />
              </FieldLabel>
              <TextInput
                id="surname"
                placeholder="Your family name"
                value={form.surname}
                onChange={set("surname")}
                required
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>
                First Name(s) <Req />
              </FieldLabel>
              <TextInput
                id="firstname"
                placeholder="Your given name(s)"
                value={form.firstname}
                onChange={set("firstname")}
                required
              />
            </FieldGroup>
          </FieldGrid>
          <FieldGrid cols={3}>
            <FieldGroup>
              <FieldLabel>
                Date of Birth <Req />
              </FieldLabel>
              <TextInput
                type="date"
                id="dob"
                value={form.dob}
                onChange={set("dob")}
                required
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>
                Gender <Req />
              </FieldLabel>
              <SelectInput
                id="gender"
                value={form.gender}
                onChange={set("gender")}
                required
              >
                <option value="">Select…</option>
                {["Male", "Female", "Prefer not to say"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </SelectInput>
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Marital Status</FieldLabel>
              <SelectInput
                id="marital"
                value={form.marital}
                onChange={set("marital")}
              >
                <option value="">Select…</option>
                {["Single", "Married", "Widowed", "Divorced / Separated"].map(
                  (o) => (
                    <option key={o}>{o}</option>
                  ),
                )}
              </SelectInput>
            </FieldGroup>
          </FieldGrid>
          <FieldGrid>
            <FieldGroup>
              <FieldLabel>
                Phone Number <Req />
              </FieldLabel>
              <TextInput
                type="tel"
                placeholder="e.g. 08012345678"
                value={form.phone}
                onChange={set("phone")}
                required
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>
                WhatsApp Number <Req />
              </FieldLabel>
              <TextInput
                type="tel"
                placeholder="If different from above"
                value={form.whatsapp}
                onChange={set("whatsapp")}
                required
              />
            </FieldGroup>
          </FieldGrid>
          <FieldGrid cols={1}>
            <FieldGroup>
              <FieldLabel>
                Email Address <Opt />
              </FieldLabel>
              <TextInput
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={set("email")}
              />
            </FieldGroup>
          </FieldGrid>
          <FieldGrid cols={1}>
            <FieldGroup>
              <FieldLabel>
                Home Address <Req />
              </FieldLabel>
              <Textarea
                placeholder="Street address, house number…"
                value={form.address}
                onChange={set("address")}
                required
                rows={2}
              />
            </FieldGroup>
          </FieldGrid>
          <FieldGrid cols={3}>
            <FieldGroup>
              <FieldLabel>
                Community <Req />
              </FieldLabel>
              <SelectInput
                id="community"
                value={form.community}
                onChange={set("community")}
                required
              >
                <option value="">Select…</option>
                {["Ijebu-Jesa", "Iwoye-Ijesa", "Other (within Oriade LGA)"].map(
                  (o) => (
                    <option key={o}>{o}</option>
                  ),
                )}
              </SelectInput>
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>LGA</FieldLabel>
              <TextInput
                value="Oriade LGA"
                readOnly
                style={{ background: "#e8e8e8", color: "#555" }}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>State</FieldLabel>
              <TextInput
                value="Osun State"
                readOnly
                style={{ background: "#e8e8e8", color: "#555" }}
              />
            </FieldGroup>
          </FieldGrid>
          <FieldGrid>
            <FieldGroup>
              <FieldLabel>State of Origin</FieldLabel>
              <TextInput
                placeholder="e.g. Osun State"
                value={form.stateorigin}
                onChange={set("stateorigin")}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Nearest Landmark</FieldLabel>
              <TextInput
                placeholder="e.g. Near St. Michael's Church"
                value={form.landmark}
                onChange={set("landmark")}
              />
            </FieldGroup>
          </FieldGrid>
        </Section>

        {/* ── SECTION B ── */}
        <Section
          letter="B"
          title="Emergency Contact"
          desc="Someone we can reach if needed"
        >
          <FieldGrid>
            <FieldGroup>
              <FieldLabel>
                Contact Full Name <Req />
              </FieldLabel>
              <TextInput
                placeholder="Full name"
                value={form.emname}
                onChange={set("emname")}
                required
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>
                Relationship to You <Req />
              </FieldLabel>
              <SelectInput value={form.emrel} onChange={set("emrel")} required>
                <option value="">Select…</option>
                {[
                  "Parent / Guardian",
                  "Spouse",
                  "Sibling",
                  "Friend",
                  "Other",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </SelectInput>
            </FieldGroup>
          </FieldGrid>
          <FieldGrid>
            <FieldGroup>
              <FieldLabel>
                Phone Number <Req />
              </FieldLabel>
              <TextInput
                type="tel"
                placeholder="08012345678"
                value={form.emphone}
                onChange={set("emphone")}
                required
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>
                WhatsApp Number <Opt />
              </FieldLabel>
              <TextInput
                type="tel"
                placeholder="If different"
                value={form.emwhatsapp}
                onChange={set("emwhatsapp")}
              />
            </FieldGroup>
          </FieldGrid>
          <FieldGrid cols={1}>
            <FieldGroup>
              <FieldLabel>
                Address <Opt />
              </FieldLabel>
              <TextInput
                placeholder="Their home or work address"
                value={form.emaddress}
                onChange={set("emaddress")}
              />
            </FieldGroup>
          </FieldGrid>
        </Section>

        {/* ── SECTION C ── */}
        <Section
          letter="C"
          title="Educational Background"
          desc="Your schooling history — all levels welcome"
        >
          <div style={{ marginBottom: 16 }}>
            <FieldLabel>
              Highest Level of Education Completed <Req />
            </FieldLabel>
            <div style={{ marginTop: 8 }}>
              <RadioGroup
                name="education"
                options={[
                  "No formal education",
                  "Primary School",
                  "Junior Secondary (JSS3)",
                  "Senior Secondary (SSCE/WAEC)",
                  "OND / NCE",
                  "HND / Degree",
                ]}
                value={form.education}
                onChange={(v) => setForm((f) => ({ ...f, education: v }))}
              />
            </div>
          </div>
          <FieldGrid>
            <FieldGroup>
              <FieldLabel>
                Last School Attended <Opt />
              </FieldLabel>
              <TextInput
                placeholder="Name of school"
                value={form.lastschool}
                onChange={set("lastschool")}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Year Completed / Left</FieldLabel>
              <TextInput
                type="number"
                placeholder="e.g. 2020"
                min="1980"
                max="2026"
                value={form.schoolyear}
                onChange={set("schoolyear")}
              />
            </FieldGroup>
          </FieldGrid>
          <Divider />
          <div style={{ marginBottom: 12 }}>
            <FieldLabel>
              Do you have any vocational or skills training certificates?
            </FieldLabel>
            <div style={{ marginTop: 8 }}>
              <RadioGroup
                name="hasCert"
                options={["Yes — I have certificates", "No, not yet"]}
                cols={2}
                value={form.hasCert}
                onChange={(v) => setForm((f) => ({ ...f, hasCert: v }))}
              />
            </div>
          </div>
          {form.hasCert === "Yes — I have certificates" && (
            <FieldGroup>
              <FieldLabel>Please specify your certificates</FieldLabel>
              <TextInput
                placeholder="e.g. NABTEB in Catering, City & Guilds in Tailoring…"
                value={form.certdetails}
                onChange={set("certdetails")}
              />
            </FieldGroup>
          )}
        </Section>

        {/* ── SECTION D ── */}
        <Section
          letter="D"
          title="Current Employment Status"
          desc="Your work situation right now"
        >
          <div style={{ marginBottom: 16 }}>
            <FieldLabel>
              Employment Status <Req />
            </FieldLabel>
            <div style={{ marginTop: 8 }}>
              <RadioGroup
                name="employment"
                options={[
                  "Unemployed",
                  "Self-employed / Business owner",
                  "Employed (part-time)",
                  "Employed (full-time)",
                  "Student",
                  "Homemaker",
                ]}
                value={form.employment}
                onChange={(v) => setForm((f) => ({ ...f, employment: v }))}
              />
            </div>
          </div>
          <FieldGrid>
            <FieldGroup>
              <FieldLabel>
                Describe your current work <Opt label="if applicable" />
              </FieldLabel>
              <TextInput
                placeholder="What do you currently do for income?"
                value={form.currentwork}
                onChange={set("currentwork")}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Number of People You Support</FieldLabel>
              <SelectInput value={form.dependants} onChange={set("dependants")}>
                <option value="">Select…</option>
                {["None", "1–2 people", "3–5 people", "6 or more"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </SelectInput>
            </FieldGroup>
          </FieldGrid>
        </Section>

        {/* ── SECTION E ── */}
        <Section
          letter="E"
          title="Skills Track Selection"
          desc="Choose one track — the foundation of your training"
        >
          <div style={{ marginBottom: 20 }}>
            <FieldLabel>
              Select Your Skills Track <Req />
            </FieldLabel>
            <FieldHint>
              Read all four options carefully before choosing. You may only
              select one.
            </FieldHint>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginTop: 8,
              }}
            >
              {[
                {
                  emoji: "🧵",
                  name: "Fashion, Textile & Design",
                  desc: "Tailoring, garment construction, Ankara & Adire fabric design, pattern cutting, fashion business",
                  val: "Track 1: Fashion, Textile & Design",
                },
                {
                  emoji: "💻",
                  name: "Digital Skills & Creative Enterprise",
                  desc: "Content creation, social media, Canva graphic design, e-commerce, digital marketing",
                  val: "Track 2: Digital Skills & Creative Enterprise",
                },
                {
                  emoji: "💅",
                  name: "Beauty, Wellness & Personal Care",
                  desc: "Hair styling, skincare formulation, soap & cosmetics production, salon business management",
                  val: "Track 3: Beauty, Wellness & Personal Care",
                },
                {
                  emoji: "🍅",
                  name: "Food Processing & Agribusiness",
                  desc: "Food preservation & packaging, catering, agribusiness management, NAFDAC basics",
                  val: "Track 4: Food Processing & Agribusiness",
                },
              ].map((t) => (
                <TrackCard
                  key={t.val}
                  emoji={t.emoji}
                  name={t.name}
                  desc={t.desc}
                  value={t.val}
                  selected={form.track === t.val}
                  onSelect={() => setForm((f) => ({ ...f, track: t.val }))}
                />
              ))}
            </div>
          </div>
          <Divider />
          <div style={{ marginBottom: 16 }}>
            <FieldLabel>
              Prior experience in your chosen track <Req />
            </FieldLabel>
            <div style={{ marginTop: 8 }}>
              <RadioGroup
                name="priorExp"
                options={[
                  "None at all",
                  "A little — basic level",
                  "Moderate — some practice",
                  "Significant — practiced regularly",
                ]}
                value={form.priorExp}
                onChange={(v) => setForm((f) => ({ ...f, priorExp: v }))}
              />
            </div>
          </div>
          <FieldGroup>
            <FieldLabel>
              Describe any experience you already have <Opt />
            </FieldLabel>
            <Textarea
              value={form.priorExpDesc}
              onChange={set("priorExpDesc")}
              maxLength={400}
              placeholder="Even if you learned from a family member, helped a friend, or practiced at home — tell us about it. It is fine to have no experience at all."
            />
          </FieldGroup>
        </Section>

        {/* ── SECTION F ── */}
        <Section
          letter="F"
          title="Motivation & Future Goals"
          desc="Tell us about your vision for your future"
        >
          <div style={{ marginBottom: 16 }}>
            <FieldLabel>
              Why are you applying for the Arise Academy? <Req />
            </FieldLabel>
            <FieldHint>
              What do you hope to gain? Be honest — there is no wrong answer.
            </FieldHint>
            <Textarea
              value={form.whyApply}
              onChange={set("whyApply")}
              required
              maxLength={600}
              rows={4}
              placeholder="Write in your own words. You can write in English or Yoruba — whatever is most comfortable for you."
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <FieldLabel>
              What business do you plan to start after graduation? <Req />
            </FieldLabel>
            <FieldHint>
              Even if it is just an idea — describe it. You will develop it
              fully during the programme.
            </FieldHint>
            <Textarea
              value={form.businessIdea}
              onChange={set("businessIdea")}
              required
              maxLength={500}
              rows={4}
              placeholder="e.g. I want to open a small tailoring shop in Iwoye-Ijesa market and specialize in Ankara party wear for celebrations…"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <FieldLabel>
              What is your biggest current challenge? <Opt />
            </FieldLabel>
            <Textarea
              value={form.biggestChallenge}
              onChange={set("biggestChallenge")}
              maxLength={400}
              rows={3}
              placeholder="What is holding you back from where you want to be? How could this programme help?"
            />
          </div>
          <Divider />
          <div style={{ marginBottom: 16 }}>
            <FieldLabel>
              Do you already have potential customers or a market?
            </FieldLabel>
            <div style={{ marginTop: 8 }}>
              <RadioGroup
                name="market"
                options={[
                  "Yes — I already have customers",
                  "I have some contacts",
                  "Not yet — I will build from scratch",
                ]}
                value={form.market}
                onChange={(v) => setForm((f) => ({ ...f, market: v }))}
              />
            </div>
          </div>
          <div>
            <FieldLabel>Do you have any startup equipment or tools?</FieldLabel>
            <div style={{ marginTop: 8 }}>
              <RadioGroup
                name="equipment"
                options={[
                  "Yes — I own relevant equipment",
                  "I have partial access",
                  "No — starting from zero",
                ]}
                value={form.equipment}
                onChange={(v) => setForm((f) => ({ ...f, equipment: v }))}
              />
            </div>
          </div>
        </Section>

        {/* ── SECTION G ── */}
        <Section
          letter="G"
          title="Availability & Commitment"
          desc="Confirming you can commit to the programme schedule"
        >
          <div style={{ marginBottom: 16 }}>
            <FieldLabel>
              Training runs Tuesday, Wednesday & Thursday — 9 AM to 3 PM for 5
              months. Are you fully available? <Req />
            </FieldLabel>
            <div style={{ marginTop: 8 }}>
              <RadioGroup
                name="availability"
                cols={2}
                options={[
                  "Yes — fully available",
                  "Mostly available (occasional conflicts)",
                  "No — I have major availability constraints",
                ]}
                value={form.availability}
                onChange={(v) => setForm((f) => ({ ...f, availability: v }))}
              />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <FieldLabel>
              Do you have any medical or physical condition that may affect your
              participation? <Req />
            </FieldLabel>
            <div style={{ marginTop: 8 }}>
              <RadioGroup
                name="medical"
                cols={2}
                options={["No — none", "Yes — please see below"]}
                value={form.medical}
                onChange={(v) => setForm((f) => ({ ...f, medical: v }))}
              />
            </div>
          </div>
          {form.medical === "Yes — please see below" && (
            <div style={{ marginBottom: 16 }}>
              <FieldLabel>Please provide details of your condition</FieldLabel>
              <Textarea
                value={form.medicalDetails}
                onChange={set("medicalDetails")}
                rows={2}
                placeholder="We ask only so we can ensure proper support for you during training. All information is confidential."
              />
            </div>
          )}
          <div>
            <FieldLabel>
              How did you hear about the Arise Academy? <Req />
            </FieldLabel>
            <div style={{ marginTop: 8 }}>
              <RadioGroup
                name="referral"
                options={[
                  "Community / Traditional leader",
                  "Facebook",
                  "Instagram",
                  "WhatsApp broadcast",
                  "Friend or family member",
                  "Church / Mosque",
                  "X (Twitter)",
                  "Other",
                ]}
                value={form.referral}
                onChange={(v) => setForm((f) => ({ ...f, referral: v }))}
              />
            </div>
          </div>
        </Section>

        {/* ── SECTION H ── */}
        <Section
          letter="H"
          title="Declaration & Agreement"
          desc="Read and confirm each statement before submitting"
        >
          <div
            style={{
              background: C.goldPale,
              border: `1.5px solid ${C.gold}`,
              borderRadius: 8,
              padding: "20px 22px",
              marginBottom: 20,
            }}
          >
            <h4
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17,
                color: C.navy,
                marginBottom: 14,
                fontWeight: 700,
              }}
            >
              By submitting this form, you confirm the following:
            </h4>
            {[
              "All information provided in this form is true, complete, and accurate to the best of my knowledge.",
              "I understand that providing false information may result in my disqualification from the Arise Academy at any stage.",
              "I commit to attending all scheduled training sessions (minimum 80% attendance) and participating fully in the programme.",
              "I understand that seed capital disbursement is conditional on completing all graduation requirements including an approved business plan.",
              "I consent to the Foundation using my photo, video, and programme story for its communications and reports, with full respect for my dignity.",
              "I agree to participate in the 6-month post-graduation business check-in programme.",
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: 10,
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "#1A1A2E",
                }}
              >
                <span style={{ color: C.gold, fontWeight: 700, flexShrink: 0 }}>
                  {i + 1}.
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <CheckboxItem
            id="dec1"
            checked={form.dec1}
            onChange={(e) => setForm((f) => ({ ...f, dec1: e.target.checked }))}
          >
            I have read all six declaration points above and I confirm that I
            agree to each one.{" "}
            <span style={{ color: C.red, fontWeight: 700 }}>*</span>
          </CheckboxItem>
          <CheckboxItem
            id="dec2"
            checked={form.dec2}
            onChange={(e) => setForm((f) => ({ ...f, dec2: e.target.checked }))}
          >
            I confirm I am between 18 and 35 years old and a resident of
            Ijebu-Jesa or Iwoye-Ijesa, Oriade LGA.{" "}
            <span style={{ color: C.red, fontWeight: 700 }}>*</span>
          </CheckboxItem>
          <CheckboxItem
            id="dec3"
            checked={form.dec3}
            onChange={(e) => setForm((f) => ({ ...f, dec3: e.target.checked }))}
          >
            I understand this application does not guarantee admission.
            Selection is competitive and the Foundation's decision is final.{" "}
            <span style={{ color: C.red, fontWeight: 700 }}>*</span>
          </CheckboxItem>
          <Divider />
          <FieldGrid>
            <FieldGroup>
              <FieldLabel>
                Full Name (as signature) <Req />
              </FieldLabel>
              <TextInput
                placeholder="Type your full name"
                value={form.signname}
                onChange={set("signname")}
                required
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Submission Date</FieldLabel>
              <TextInput
                value={today}
                readOnly
                style={{ background: "#e8e8e8", color: "#555" }}
              />
            </FieldGroup>
          </FieldGrid>
        </Section>

        {/* Submit Section */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: "28px 24px",
            boxShadow: `0 4px 24px rgba(27,58,107,0.12)`,
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22,
              color: C.navy,
              marginBottom: 8,
              fontWeight: 700,
            }}
          >
            Ready to Submit Your Application?
          </h3>
          <p
            style={{
              fontSize: 13,
              color: C.mid,
              marginBottom: 24,
              lineHeight: 1.6,
            }}
          >
            Please review all your answers before submitting. Once submitted,
            you will receive a reference number — keep it safe.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Btn variant="secondary" onClick={() => window.print()}>
              🖨️ Print Form
            </Btn>
            <Btn variant="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Application →"}
            </Btn>
          </div>
        </div>
      </main>

      {showModal && <SaveModal onClose={() => setShowModal(false)} />}
      <Footer />
    </div>
  );
}

// ── BTN ───────────────────────────────────────────────────────────
function Btn({ variant = "primary", onClick, children }) {
  const styles = {
    primary: {
      background: C.navy,
      color: "#fff",
      boxShadow: "0 4px 16px rgba(27,58,107,0.3)",
      minWidth: 180,
    },
    secondary: {
      background: "transparent",
      color: C.navy,
      border: `1.5px solid ${C.navy}`,
    },
    gold: { background: C.gold, color: C.navyDeep, fontWeight: 700 },
  };
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "14px 28px",
        borderRadius: 8,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        border: "none",
        transition: "all .2s",
        ...styles[variant],
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.88";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "none";
      }}
    >
      {children}
    </button>
  );
}

// ── HEADER ────────────────────────────────────────────────────────
function Header() {
  return (
    <header
      style={{
        background: C.navyDeep,
        padding: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${C.gold}, ${C.goldLight}, ${C.gold}, transparent)`,
        }}
      />
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "36px 24px 32px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: 4,
            color: C.gold,
            textTransform: "uppercase",
            marginBottom: 16,
            opacity: 0.9,
          }}
        >
          The Ogbeni Olajide Awe Foundation
        </div>
        <div
          style={{
            width: 52,
            height: 52,
            border: `2px solid ${C.gold}`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            background: "rgba(201,168,76,0.08)",
          }}
        >
          <svg
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={28}
            height={28}
          >
            <path
              d="M14 2L3 8v12l11 6 11-6V8L14 2z"
              stroke={C.gold}
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M14 6l-7 4v8l7 4 7-4v-8L14 6z"
              fill="rgba(201,168,76,0.15)"
            />
            <text
              x="14"
              y="18"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="9"
              fill={C.gold}
              fontWeight="bold"
            >
              A
            </text>
          </svg>
        </div>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px, 6vw, 44px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          The <span style={{ color: C.gold }}>Arise</span> Academy
        </h1>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 17,
            color: "rgba(255,255,255,0.65)",
            fontStyle: "italic",
            marginBottom: 24,
          }}
        >
          Skills & Entrepreneurship Programme — Cohort 1, 2026/2027
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {[
            "Free Training",
            "Seed Capital Grant",
            "Oriade LGA",
            "Closes 30 June 2026",
          ].map((p) => (
            <span
              key={p}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "1.5px",
                color: C.navyDeep,
                background: C.gold,
                padding: "4px 14px",
                borderRadius: 20,
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

// ── SAVE MODAL ────────────────────────────────────────────────────
function SaveModal({ onClose }) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,35,71,0.7)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          maxWidth: 460,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22,
            color: C.navy,
            marginBottom: 12,
            fontWeight: 700,
          }}
        >
          Save Your Application
        </h3>
        <p
          style={{
            fontSize: 13,
            color: C.mid,
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          Use your browser's <strong>File → Save As</strong> (or Ctrl+S / Cmd+S)
          to save this page. You can also take a screenshot of your reference
          number for your records.
        </p>
        <Btn variant="primary" onClick={onClose}>
          Got it — Close
        </Btn>
      </div>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: C.navyDeep,
        padding: "28px 24px",
        textAlign: "center",
        marginTop: 40,
      }}
    >
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "1.5px",
          lineHeight: 1.8,
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: C.gold }}>The Arise Academy</span> — Cohort 1,
        2026/2027
        <br />
        An Initiative of The Ogbeni Olajide Awe Foundation
        <br />
        Ijebu-Jesa & Iwoye-Ijesa | Oriade LGA, Osun State, Nigeria
        <br />
        Form Reference: OAAF/AA/WEB/REG/2026 | All information strictly
        confidential
      </p>
    </footer>
  );
}
