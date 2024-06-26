import "../styles/card.css";
import pinImage from "../assets/pin.png";
import Button from "./Button";
import { Disc } from "../App";
import { useNavigate } from "react-router-dom";

interface CardClaimProps {
  disc: Disc;
  className?: string;
}

const CardClaim = (props: CardClaimProps) => {
  const { disc, className } = props;
  const cardClassName = className ? `card-container ${className}` : "card-container";
  
  return (
    <div className={cardClassName}>
      <div className="disc-info">
        <div className="div-block-2">
          <div className="circle-overlay">
            <img src={pinImage} alt="pin-icon" />
          </div>
          <div className="text-block-2" >
            <div className="course-wrapper">{disc.course}</div>
          </div>
        </div>
        <img
          src="https://i.ebayimg.com/images/g/y-gAAOSwHtdlCbey/s-l1200.jpg"
          loading="lazy"
          alt="disc"
          className="image"
          style={{ boxShadow: '2px 2px 20px 2px rgba(0, 0, 0, 0.3)' }}
        />
        <div className="w-layout-grid grid grid-disc">
          <div className="course-list-claim" style={{ boxShadow: '2px 2px 20px 2px rgba(0, 0, 0, 0.3)' }}>
            <ul>
              <li>
                <i className="bx bx-palette" />
                <span>{disc.color}</span>
              </li>
              <li>
                <i className="bx bxs-user-detail" />
                <span>{disc.name}</span>
              </li>
              <li>
                <i className="bx bx-purchase-tag" />
                <span>
                  {disc.brand} {disc.disc}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardClaim;
