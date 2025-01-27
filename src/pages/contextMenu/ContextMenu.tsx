import Styles from "./ContextMenu.module.css";
import { useSilverList } from "../../contexts/silverListContext";
//import { useMathContext } from "../../contexts/mathContext";

const ContextMenu: React.FC = () => {
    const {
        windowSize,
        leftHandArray,
        holdLeftHandItem,
        holdSilverListArrayIndex,
        leftHandSum,
    } = useSilverList();

//    const {} = useMathContext();

    return(<>
    {windowSize.width < 1050 || windowSize.height < 500 ? (<>
    
    </>) : (<>
        <table className={Styles.ContextMenuBase}>
            <tr className={Styles.LeftDiv}>
                <td>Items: {leftHandArray.length}</td>
                <td>Index: {holdSilverListArrayIndex}</td>
            </tr>
            <tr className={Styles.CenterDiv}>
                <td>Sum no var: {leftHandSum.noVar}</td>
                <td>Sum X: {leftHandSum.varX}x^{leftHandSum.powX}</td>
                <td>Sum Y: {leftHandSum.varY}x^{leftHandSum.powY}</td>
                <td>Sum Z: {leftHandSum.varZ}x^{leftHandSum.powZ}</td>
            </tr>
            <tr className={Styles.RightDiv}>
                <td>ID: {holdLeftHandItem.id}</td>
                <td>Value: {holdLeftHandItem.value}</td>
                <td>Variable: {holdLeftHandItem.variable}</td>
                <td>Power: {holdLeftHandItem.power}</td>
            </tr>
        </table>
    </>)}
    </>)
}

export default ContextMenu;