/** Editorial section marker: "№ 03 — Selected Work". */
export default function SectionHead({ num, label, children }) {
  return (
    <div className="shead" data-reveal>
      <span className="mono shead-num">№ {String(num).padStart(2, '0')}</span>
      <span className="shead-line" />
      <span className="mono shead-label">{label}</span>
      {children}
    </div>
  );
}
