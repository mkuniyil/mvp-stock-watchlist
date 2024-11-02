import { FC, ReactNode } from "react";
import { TbAlertTriangle } from "react-icons/tb";
import { TEST_IDS } from "../../../constants";
import "./index.css";

interface AlertProps {
  children: ReactNode;
}

const Alert: FC<AlertProps> = ({ children }) => {
  return (
    <div className="alert" data-testid={TEST_IDS.ALERT}>
      <TbAlertTriangle />
      {children}
    </div>
  );
};

export default Alert;
