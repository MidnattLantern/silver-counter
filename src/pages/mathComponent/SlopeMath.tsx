import Styles from "./SlopeMath.module.css";
import { useSilverList } from "../../contexts/silverListContext";
import { useEffect, useState } from "react";

const SlopeMath = () => {
    // states
    const [x1Value, setX1Value] = useState<number | null>(null);
    const [x2Value, setX2Value] = useState<number | null>(null);
    const [y1Value, setY1Value] = useState<number | null>(null);
    const [y2Value, setY2Value] = useState<number | null>(null);
    const [kValue, setKValue] = useState<number | null>(null);

    const {
        leftHandArray,
        holdLeftHandItem,
    } = useSilverList();

    // functions
    const AssignSlopeItem = (target: any, setValue: (value: any) => void, variableCheck: string) => {
        leftHandArray.map((item) => {
            if (
            item.id === target &&           // identify the item
            item.variable === variableCheck // assign only if variable is matching (x cannot assign y)
            ) {
                setValue(item.value)
            };
            return null; // pointless return to satisfy a warning at =>
        });
    };

    // effect
    useEffect(() => {
        if (x1Value !== null && x2Value !== null && y1Value !== null && y2Value !== null) {
            const deltaX = x2Value - x1Value;
            const deltaY = y2Value - y1Value;
            if (deltaX === 0) {
                setKValue(null) // division by 0 would cause awkward client experience
            } else {
                setKValue((deltaY) / (deltaX))
            };
        }
    },[x1Value, x2Value, y1Value, y2Value]);

    return(<div className={Styles.SlopeMathBaseModule}>
        <table className={Styles.SlopeTable}>
            <tr className={Styles.AlignTableRow}>
                <td>x1:</td>
                <td>{x1Value}</td>
                <td><button className={Styles.AssignButton} onClick={() => {AssignSlopeItem(holdLeftHandItem.id, setX1Value, "x")}}>Assign</button></td>
            </tr>
            <tr className={Styles.AlignTableRow}>
                <td>x2:</td>
                <td>{x2Value}</td>
                <td><button className={Styles.AssignButton} onClick={() => {AssignSlopeItem(holdLeftHandItem.id, setX2Value, "x")}}>Assign</button></td>
            </tr>
            <tr className={Styles.AlignTableRow}>
                <td>y1:</td>
                <td>{y1Value}</td>
                <td><button className={Styles.AssignButton} onClick={() => {AssignSlopeItem(holdLeftHandItem.id, setY1Value, "y")}}>Assign</button></td>
            </tr>
            <tr className={Styles.AlignTableRow}>
                <td>y2:</td>
                <td>{y2Value}</td>
                <td><button className={Styles.AssignButton} onClick={() => {AssignSlopeItem(holdLeftHandItem.id, setY2Value, "y")}}>Assign</button></td>
            </tr>
            <tr className={Styles.AlignTableRow}>
                <td>k:</td>
                <td>{kValue}</td>
            </tr>
            <div>
                <p>({y2Value} - {y1Value}) / ({x2Value} - {x1Value})</p>
            </div>
        </table>
    </div>)
};

export default SlopeMath;