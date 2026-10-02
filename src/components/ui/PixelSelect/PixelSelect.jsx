import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EASE_OUT_EXPO } from '../../../animations/variants.js';
import { pad2 } from '../../../utils/format.js';
import './PixelSelect.css';

const TYPEAHEAD_RESET_MS = 600;

// 5×3 pixel chevron
function PixelChevron() {
  return (
    <svg className="pixel-select-chevron" viewBox="0 0 5 3" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="0" y="0" width="1" height="1" fill="currentColor" />
      <rect x="4" y="0" width="1" height="1" fill="currentColor" />
      <rect x="1" y="1" width="1" height="1" fill="currentColor" />
      <rect x="3" y="1" width="1" height="1" fill="currentColor" />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Accessible custom dropdown (combobox + listbox) in the site's pixel style.
 * Keyboard: ↑/↓, Home/End, Enter/Space, Esc, Tab, and type-ahead.
 *
 * options: [{ value, label }]
 */
export default function PixelSelect({
  id,
  labelId,
  value,
  options,
  onChange,
  onBlur,
  placeholder = 'SELECT',
  disabled = false,
  invalid = false,
  describedBy,
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const typeahead = useRef({ text: '', timer: null });

  const listId = `${id}-listbox`;
  const optionId = (index) => `${id}-option-${index}`;
  const selected = options.find((o) => o.value === value);

  const openList = () => {
    if (disabled) return;
    setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const closeList = (refocus = false) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
    onBlur?.();
  };

  const choose = (option) => {
    onChange(option.value);
    closeList(true);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) closeList();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]); // closeList only reads refs/props that are stable while open

  // Keep the active option visible
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  useEffect(() => () => clearTimeout(typeahead.current.timer), []);

  const runTypeahead = (char) => {
    const state = typeahead.current;
    clearTimeout(state.timer);
    state.text += char.toLowerCase();
    state.timer = setTimeout(() => (state.text = ''), TYPEAHEAD_RESET_MS);

    const match = options.findIndex((o) => o.label.toLowerCase().startsWith(state.text));
    if (match < 0) return;
    if (open) setActiveIndex(match);
    else onChange(options[match].value);
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    const last = options.length - 1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => Math.min(last, i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case 'Home':
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case 'End':
        if (open) {
          e.preventDefault();
          setActiveIndex(last);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!open) openList();
        else if (options[activeIndex]) choose(options[activeIndex]);
        break;
      case 'Escape':
        if (open) {
          e.preventDefault();
          closeList(true);
        }
        break;
      case 'Tab':
        if (open) closeList();
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) runTypeahead(e.key);
    }
  };

  const classes = ['pixel-select', open && 'is-open', invalid && 'is-invalid', disabled && 'is-disabled', selected && 'has-value']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} ref={rootRef}>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        className="pixel-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId ? `${labelId} ${id}` : undefined}
        aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        disabled={disabled}
        onClick={() => (open ? closeList() : openList())}
        onKeyDown={onKeyDown}
      >
        <span className={`pixel-select-value${selected ? '' : ' is-placeholder'}`}>{selected?.label ?? placeholder}</span>
        <PixelChevron />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            className="pixel-select-list"
            data-lenis-prevent
            style={{ originY: 0 }}
            initial={{ opacity: 0, y: -6, scaleY: 0.94 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.94, transition: { duration: 0.12 } }}
            transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <motion.li
                  key={option.value}
                  id={optionId(index)}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  className={`pixel-select-option${index === activeIndex ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.03 * index, duration: 0.2 } }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(e) => e.preventDefault()} // keep focus on the trigger
                  onClick={() => choose(option)}
                >
                  <span className="pixel-select-option-index">{pad2(index + 1)}</span>
                  <span className="pixel-select-option-label">{option.label}</span>
                  {isSelected && (
                    <span className="pixel-select-option-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
