import "../styles/formStep2.css";

interface FormStepProps {
    inputName: string;
    setPhoneNumber: (value: string) => void;
}

const FormStep: React.FC<FormStepProps> = (props) => {
    const { inputName, setPhoneNumber } = props;

    return (
        <div className="select-box-step">
            <div className="col-12-step col-md-10 col-lg-8" style={{ padding: '0' }}>
                <input
                    className="form-control-step"
                    placeholder={inputName}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
        </div>
    );
};

export default FormStep;
