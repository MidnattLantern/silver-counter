// styles
import { useSilverList } from "../../contexts/silverListContext";
import Styles from "./SilverList.module.css";
import { v4 as uuidv4 } from 'uuid';
import SilverListItem from "./SilverListItem";
import { useEffect, useRef } from "react";

const SilverList: React.FC = () => {
    const SilverListReference = useRef<HTMLDivElement | null>(null);
    const newItemIndex = uuidv4();
    const {
        leftHandArray, holdLeftHandItem, setHoldLeftHandItem, addLeftHandItem, setFollowCursor, setSilverListUIWidth,
    } = useSilverList();

    useEffect(() => {
        const element = SilverListReference.current
        if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            if (entry.target === element) {
                const newWidth = entry.contentRect.width; // Get the new width
                setSilverListUIWidth(newWidth);
            }
        }
    });
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect(); // Clean up when the component unmounts
    };
    }, [setSilverListUIWidth])

    // functions

    const handleSetHoldLeftHandItem = (item: any) => {
        setHoldLeftHandItem({ id: item.id, value: item.value, variable: item.variable, power: item.power })
    };



    const handleCreateItem = () => {
        const newItem = {
            id: newItemIndex,
            value: 1,
            variable: null,
            power: 1,
        };
        addLeftHandItem(newItem);
        setHoldLeftHandItem({id: newItemIndex, value: 1, variable: null, power: 1});
    };

    return(<>
        <div className={Styles.SilverListBaseModule}>
            <div className={Styles.SilverListWindow}
            ref={SilverListReference}
            onMouseEnter={() => {setFollowCursor(true)}}
            onMouseLeave={()=> {setFollowCursor(false)}}
            >

                {leftHandArray.map((item, index) => (
                    <div onClick={() => {handleSetHoldLeftHandItem(item)}} onMouseEnter={() => {handleSetHoldLeftHandItem(item)}}>
                        <SilverListItem key={index} item={item} holdLeftHandItem={holdLeftHandItem}/>
                    </div>
                ))}

                <div className={Styles.AddButton} onClick={() => {handleCreateItem()}}>
                    <h1 className={Styles.ItemNameText}>+ Add</h1>
                </div>

            </div>
        </div>
    </>)
};

export default SilverList;