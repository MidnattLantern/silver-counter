import Styles from "./DerivateMath.module.css";
import { useSilverList } from "../../contexts/silverListContext";
import { useEffect, useState } from "react";

const DerivateMath = () => {
    // context import
    const {
        leftHandArray,
        holdLeftHandItem,
    } = useSilverList();

    //states
    const [holdSelectedValue, setHoldSelectedValue] = useState<number | null>(null);
    const [holdSelectedVariable, setHoldSelectedVariable] = useState<string | null>(null);
    const [holdSelectedPower, setHoldSelectedPower] = useState<number| null>(null);
    const [derivateValue, setDerivateValue] = useState<number | null>(null);
    const [dissolveDerivateVariable, setDissolveDerivateVariable] = useState<boolean>(false);
    const [dissolveExpression, setDissolveExpression] = useState<boolean>(false);
    const [derivatePower, setDerivatePower] = useState<number | null>(null);

    //effect
    useEffect(() => {
        leftHandArray.find((item) => {
            if (item.id === holdLeftHandItem.id) {
                setHoldSelectedValue(item.value)
                setHoldSelectedVariable(item.variable)
                setHoldSelectedPower(item.power)
                setDerivateValue(item.value * item.power)
                setDerivatePower(item.power -1)
                if ((holdSelectedPower === null || holdSelectedPower -1) === 0) {
                    setDissolveDerivateVariable(true)
                } else {
                    setDissolveDerivateVariable(false)
                }
                if (holdLeftHandItem.variable === null || holdSelectedPower === 0) {
                    setDissolveExpression(true)
                } else {
                    setDissolveExpression(false)
                }
            }
            return null; // satisfy warning at =>
        })
    },[leftHandArray, holdLeftHandItem, holdSelectedPower])

    return(<div className={Styles.DerivateMathBaseModule}>
        {holdSelectedPower !== null ? (<>
            <h1>f = {holdSelectedValue}{holdSelectedVariable}^{holdSelectedPower}</h1>
            <h1>f ' = {dissolveExpression ? (<>
                0
            </>) : (<>
                {derivateValue}{dissolveDerivateVariable ? (null) : (<>{holdSelectedVariable}^{derivatePower}</>)}
            </>)}
            </h1>
        </>) : null}
    </div>)
};

export default DerivateMath;