import { AnimatePresence, motion } from 'motion/react';

/**
 * Labelled form row: "01 / FULL NAME *" + control + a fixed-height error slot
 * (fixed so errors never push the single-screen layout around).
 */
export default function FormField({
  index,
  label,
  htmlFor,
  labelId,
  required = false,
  optional = false,
  aside,
  error,
  errorId,
  className = '',
  children,
}) {
  return (
    <div className={`enquiry-field ${className}`.trim()}>
      <div className="enquiry-field-head">
        <label id={labelId} htmlFor={htmlFor} className="enquiry-label">
          <span className="enquiry-label-index">{index}</span>
          <span className="enquiry-label-sep">/</span>
          {label}
          {required && (
            <span className="enquiry-required" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {optional && <span className="enquiry-optional">OPTIONAL</span>}
        {aside}
      </div>

      {children}

      <div className="enquiry-error-slot">
        <AnimatePresence initial={false}>
          {error && (
            <motion.p
              key={error}
              id={errorId}
              className="enquiry-error"
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
            >
              <span aria-hidden="true">!</span> {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
