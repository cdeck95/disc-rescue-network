import "../styles/reportLostComponents.css";
import Button from "./Button";
import NameAndInitialForm from "./NameAndInitialForm";
import FormClaimDiscContact from "./FormClaimDiscContact";
import "../styles/claimDiscComponents.css"

interface HeaderReportLostProps {
  className?: string;
  contactMethod: "phone" | "email";
}

const ClaimDiscComponents = (props: HeaderReportLostProps) => {
  const { className, contactMethod } = props;

  return (
    <div className={`report-lost-components ${className}`}>
        <h2>
          Let's Get Your
          <span className="fw-light"> Disc</span>
        </h2>
      <h2 className="info-claim">
        Just Enter Some
        <span className="missingtext"> Info</span>
        .
      </h2>
      <NameAndInitialForm />
      <FormClaimDiscContact 
        contactMethod={contactMethod} 
        initialName={"Choose a Pickup Location"} 
        />
      <Button
        text={"Schedule Your Disc Pickup"}
        red={true}
        border={true}
        className="button-claim-disc-form"
        onClick={() => {
          alert("button clicked");
        }}
      />
      <Button
        text={"Surrender Disc"}
        red={false}
        border={true}
        className="button-claim-disc-form"
        onClick={() => {
          alert("button clicked");
        }}
      />
    </div>
  );
};

export default ClaimDiscComponents;
