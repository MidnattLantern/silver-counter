import Styles from "./RearrangeButtons.module.css";
import { useSilverList } from "../../contexts/silverListContext";

const RearrangeButtons: React.FC = () => {
    const {
        moveLeftHandItemLeft, moveLeftHandItemRight, holdSilverListArrayIndex, leftHandArray,
    } = useSilverList();

    const moveLeftButton = () => {
        return(<>
            {holdSilverListArrayIndex-1 >= 0 ? (<>
                <button className={Styles.RearrangeButton} onClick={() => {moveLeftHandItemLeft()}}> ← </button>
            </>) : (<>
                <button className={Styles.OutOfRangeButton} onClick={() => {}}> ← </button>
            </>)}
        </>)
    };

    const moveRightButton = () => {
        return(<>
            {holdSilverListArrayIndex+1 < leftHandArray.length ? (<>
                <button className={Styles.RearrangeButton} onClick={() => {moveLeftHandItemRight()}}> → </button>
            </>) : (<>
                <button className={Styles.OutOfRangeButton} onClick={() => {}}> → </button>
            </>)}
        </>)
    };

    return(<>
        <div className={Styles.RearrangeButtonsBase}>
            {moveLeftButton()}
            {moveRightButton()}
        </div>
    </>)
};

export default RearrangeButtons;