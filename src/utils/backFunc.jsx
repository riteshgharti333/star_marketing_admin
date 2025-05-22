import { useNavigate } from "react-router-dom";

export function useBackPage() {
  const navigate = useNavigate();
  return () => navigate(-1);
}
