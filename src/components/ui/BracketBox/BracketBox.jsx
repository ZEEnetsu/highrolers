// The four 3px corner marks that sit on every .bracket-box
export function BracketCorners() {
  return (
    <>
      <span className="corner-tl" />
      <span className="corner-tr" />
      <span className="corner-bl" />
      <span className="corner-br" />
    </>
  );
}

/**
 * Glass panel with corner brackets. Avoid animating its transform directly —
 * .bracket-box has a CSS `transition: all`, so wrap it in a motion element instead.
 */
export default function BracketBox({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`bracket-box ${className}`.trim()} {...rest}>
      <BracketCorners />
      {children}
    </Tag>
  );
}
