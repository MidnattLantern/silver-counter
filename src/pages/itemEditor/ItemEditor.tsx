import Styles from "./ItemEditor.module.css";
import { useSilverList } from "../../contexts/silverListContext";
import { useEffect, useState } from "react";
import RearrangeButtons from "./RearrangeButtons";

const ItemEditor: React.FC = () => {
    const {
//        holdSilverListItem,
        holdLeftHandItem,
        setHoldLeftHandItem,
        eraseLefthandItem,
        followCursor,
        cursorXCoordinate,
        setCursorXCoordinate,
        silverListUIWidth,
        windowSize,
        handleAddLeftMathItemValue,
        handleChangeLeftMathItemVariable,
        handleAddLeftMathItemPower,
    } = useSilverList();

    // detect mouse position
    const [position, setPosition] = useState({ x: 25 });
    useEffect(() => {
        if (followCursor){
            const handleMouseMove = (event: MouseEvent) => {
                setPosition({ x: ((event.clientX) -(180/(windowSize.width/2 /event.clientX)))});
                setCursorXCoordinate({ x: event.clientX });
            };
            window.addEventListener('mousemove', handleMouseMove);
            return () => { // cleanup
            window.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, [followCursor, setCursorXCoordinate, silverListUIWidth, cursorXCoordinate, windowSize]);

    const handleDeselectItem = () => {
        setHoldLeftHandItem({id: null, value: null, variable: null, power: null});
    };
    const handleEraseItem = () => {
        eraseLefthandItem(holdLeftHandItem.id);
        setHoldLeftHandItem({id: null, value: null, variable: null, power: null});
    };
    const handleSetValue = (value: number) => {
        handleAddLeftMathItemValue(value)
    };
    const handleSetVariable = (variable: any) => {
        handleChangeLeftMathItemVariable(variable)
    };
    const handleSetPower = (value: number) => {
        handleAddLeftMathItemPower(value)
    };

    return(<>
        <div className={Styles.ItemEditorBase}>

            <div // Element that follow the cursor
            style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `120px`,
            }}
            >
                <div className={`${Styles.EditorWindow} ${holdLeftHandItem.id ? Styles.EditorWindowShow : Styles.EditorWindowHide}`}>
                    <div className={Styles.ControllButtonsComponent}>
                        <div className={Styles.ControlButtonsRow}>
                            <button className={Styles.ControllButton} onClick={() => {handleSetValue(1)}}>+1</button>
                            <button className={Styles.ControllButton} onClick={() => {handleSetValue(5)}}>+5</button>
                            <button className={Styles.ControllButton} onClick={() => {handleSetValue(-1)}}>-1</button>
                            <button className={Styles.ControllButton} onClick={() => {handleSetValue(-5)}}>-5</button>
                        </div>
                        <div className={Styles.ControlButtonsRow}>
                            <button className={Styles.ControllButton} onClick={() => {handleSetVariable(null)}}>none</button>
                            <button className={Styles.ControllButton} onClick={() => {handleSetVariable("x")}}>X</button>
                            <button className={Styles.ControllButton} onClick={() => {handleSetVariable("y")}}>Y</button>
                            <button className={Styles.ControllButton} onClick={() => {handleSetVariable("z")}}>Z</button>
                        </div>
                        <div className={Styles.ControlButtonsRow}>
                            <button className={Styles.ControllButton} onClick={() => {handleSetPower(1)}}>^ +1</button>
                            <button className={Styles.ControllButton} onClick={() => {handleSetPower(-1)}}>^ -1</button>
                        </div>
                    </div>

                    <h1 className={Styles.EraseButton} onClick={() => {handleDeselectItem()}}>Deselect</h1>
                    <h1 className={Styles.EraseButton} onClick={() => {handleEraseItem()}}>Erase</h1>

                <RearrangeButtons />

                </div>
            </div>

        </div>
    </>)
}

export default ItemEditor
