import Button from "./ui/Button.tsx";
import { MdOutlineBackspace, MdOutlineCleaningServices } from "react-icons/md";

interface ControlsProps {
  clearMessage: () => void;
  backspaceMessage: () => void;
}

function Controls({ clearMessage, backspaceMessage }: ControlsProps) {
  return (
    <div className={"mt-2 flex justify-end gap-2"}>
      <Button label={<MdOutlineCleaningServices />} onClick={clearMessage} />
      <Button label={<MdOutlineBackspace />} onClick={backspaceMessage} />
    </div>
  );
}
export default Controls;
