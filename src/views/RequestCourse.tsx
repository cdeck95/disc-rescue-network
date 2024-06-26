import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import RequestCourseComponents from "../components/RequestCourseComponents";
import FormRequestCourse from "../components/FormRequestCourse";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Settings() {  
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }

    if (step === 1) {
      navigate("/");
    }
  };
  
    return (
        <div className="container-request-course">
            <div className="main-section-request">
            <i className="arrow-left-icon-request-course" 
                style={{top: '70px'}}
                onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </i>
            <div className="logo-request-course">
                <LogoRescueFlow2 />
            </div>
            <RequestCourseComponents 
                baseText={"Request a"}
                lightText={"Course"}
                whereText={"What are we"}
                secondMissingText={" Missing?"}/> 
            </div> 
            <FormRequestCourse initialName={"State"} lastName={"Course Name"} />
            <Button
                text={"Request Your Course"}
                red={true}
                className="button-request"
                onClick={() => {
                  alert("button clicked");
                }}
              />
        </div>
    )
}