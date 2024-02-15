import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedError = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }) 
}

export default UnauthorizedError;