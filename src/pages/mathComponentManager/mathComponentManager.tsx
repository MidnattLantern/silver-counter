import Styles from "./mathComponentManager.module.css";
import SlopeMath from "../mathComponent/SlopeMath";
import DerivateMath from "../mathComponent/DerivateMath";
import { useState } from "react";

const MathComponentManager = () => {

    const [selectedComponentType, setSelectedComponentType] = useState<string | null>("derivate");

    const SelectMathComponent = () => {
        return(<div className={Styles.SelectMathComponent}>
            <button className={Styles.ComponentOption} onClick={() => {setSelectedComponentType("slope")}}>Slope</button>
            <button className={Styles.ComponentOption} onClick={() => {setSelectedComponentType("derivate")}}>Derivate</button>
        </div>)
    };

    const DisplayMathComponent = ( componentType: string | null ) => {
        const SwitchCase = () => {
            switch (componentType) {
                case "slope":
                    return <SlopeMath />
                case "derivate":
                    return <DerivateMath />
            }
        }
        return(<div className={Styles.SwitchCaseComponent}>
            {SwitchCase()}
        </div>)
    }

    return(<div className={Styles.MathComponentManagerBaseModule}>
        <div className={Styles.MasterModule}>
            {SelectMathComponent()}
            {DisplayMathComponent(selectedComponentType)}
        </div>
    </div>)
};

export default MathComponentManager;