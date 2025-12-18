import "./label-value.scss";

interface LabelValueProps {
  label: string;
  value: string | number | React.ReactNode;
}

const LabelValue = ({ label, value }: LabelValueProps) => {
  return (
    <div className="label-value">
      <div className="label-value__label">{label}</div>
      <div className="label-value__value">{value}</div>
    </div>
  );
};

export default LabelValue;
