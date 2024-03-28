import { Patient } from "../../types/type";

interface PatientProps {
    patient: Patient | null;
    onClose: () => void;
  }
  export default PatientProps