const STATUS_STYLES = {
  Saved: "bg-neutral text-ink-soft",
  Applied: "bg-surface text-ink",
  Interview: "bg-[#DCE3D0] text-[#48562F]",
  Offer: "bg-[#C9D6B4] text-[#3A4A26]",
  Rejected: "bg-[#EADCDC] text-[#7A4646]",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${
      STATUS_STYLES[status] || "bg-neutral text-ink-soft"
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
