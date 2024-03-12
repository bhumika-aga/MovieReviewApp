import { useState } from "react";

export const Toggle = ({ label, toggled, onClick }) => {
  const [isToggle, setIsToggle] = useState(toggled);

  const callback = () => {
    onClick(!isToggle);
    setIsToggle(!isToggle);
  };

  return (
    <label>
      <input type="checkbox" defaultChecked={isToggle} onClick={callback} />
      <span />
      <strong>{label}</strong>
    </label>
  );
};