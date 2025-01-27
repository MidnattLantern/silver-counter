import { useEffect, useState } from "react";
import Styles from "./SilverList.module.css";

interface SilverListItemProps {
    item: {
        id: any;
        value: number;
        variable: null | string;
        power: number;
    };
    holdLeftHandItem: any;
}

const SilverListItem: React.FC<SilverListItemProps> = ({ item, holdLeftHandItem }) => {
    const [bornAnimationKey1, setBornAnimationKey1] = useState(false);
    const [bornAnimationKey2, setBornAnimationKey2] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setBornAnimationKey1(true);
        }, 0);
        setTimeout(() => {
            setBornAnimationKey2(true);
        }, 0);
    }, []);

    return(<>
        <div className={`
        ${Styles.SilverListItemBase}
        ${bornAnimationKey1 ? Styles.BornAnimationKey1After : Styles.BornAnimationKey1Before}
        ${item.id === holdLeftHandItem.id ? Styles.Focus : null}
        `}>
            <h1 className={`
            ${Styles.ItemNameText}
                ${bornAnimationKey2 ? Styles.BornAnimationKey2After : Styles.BornAnimationKey2Before}
            `}>
                {item.value}{item.variable}^{item.power}
            </h1>
        </div>
    </>)
}

export default SilverListItem