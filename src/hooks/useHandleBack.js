import { useNavigate } from "react-router-dom";

const useHandleBack = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return handleBack;
};

export default useHandleBack;
