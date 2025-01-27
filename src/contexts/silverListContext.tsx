import React, { createContext, useState, ReactNode, useContext, useEffect, useCallback } from 'react';

const SilverListContext = createContext<SilverListContextType | undefined>(undefined);

interface SilverListProviderProps {
    children: ReactNode;
};
interface LeftHandItem {
    id: string;
    value: number;
    variable: null | string;
    power: number;
};

interface SilverListContextType {
    leftHandArray: LeftHandItem[];
    setLeftHandArray: React.Dispatch<React.SetStateAction<any>>;
    holdLeftHandItem: any;
    setHoldLeftHandItem: React.Dispatch<React.SetStateAction<any>>;
    addLeftHandItem: (newLeftHandItem: LeftHandItem) => void;
    eraseLefthandItem: (index: string) => void;
    moveLeftHandItemLeft: any;
    moveLeftHandItemRight: any;
    leftHandSum: any;
    setLeftHandSum: React.Dispatch<React.SetStateAction<any>>;

    holdSilverListArrayIndex: any;
    setHoldSilverListArrayIndex: React.Dispatch<React.SetStateAction<any>>;
    followCursor: boolean;
    setFollowCursor: React.Dispatch<React.SetStateAction<boolean>>;
    windowSize: any;
    silverListUIWidth: any;
    setSilverListUIWidth: (index: number) => void;
    cursorXCoordinate: any;
    setCursorXCoordinate: (index: any) => void;
    handleAddLeftMathItemValue: (index: number) => void;
    handleChangeLeftMathItemVariable: (index: string | null) => void;
    handleAddLeftMathItemPower: (index: number) => void;
}

export const SilverListProvider: React.FC<SilverListProviderProps> = ({ children }) => {
    // states
    const [silverListUIWidth, setSilverListUIWidth] = useState<any>(null);
    const [cursorXCoordinate, setCursorXCoordinate] = useState<any>(0);
    const [leftHandSum, setLeftHandSum] = useState<{
        noVar: number | null;
        varX: number | null;
        powX: number | null;
        varY: number | null;
        powY: number | null;
        varZ: number | null;
        powZ: number | null;
    }>({
        noVar: 0,
        varX: 0,
        powX: 0,
        varY: 0,
        powY: 0,
        varZ: 0,
        powZ: 0,
    })

    const [holdSilverListArrayIndex, setHoldSilverListArrayIndex] = useState<any>(null);
    const [followCursor, setFollowCursor] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [leftHandArray, setLeftHandArray] = useState<{id: any; value: any; variable: any; power: any}[]>([
            {
                id: "dummy-id-1",
                value: 3,
                variable: "x",
                power: 2,
            },
            {
                id: "dummy-id-2",
                value: 4,
                variable: "x",
                power: 1,
            },
            {
                id: "dummy-id-3",
                value: 10,
                variable: null,
                power: 1,
            },
            {
                id: "dummy-id-4",
                value: 7,
                variable: "y",
                power: 1,
            },
        ]);

const [holdLeftHandItem, setHoldLeftHandItem] = useState<{ id: any; value: any; variable: any; power: any } | null>(
    {
        id: null,
        value: null,
        variable: null,
        power: null,
    },
);

// functions
    const addLeftHandItem = (newLeftHandItem: LeftHandItem) => {
        setLeftHandArray((prevArray) => [...prevArray, newLeftHandItem]);
        console.log(newLeftHandItem)
    };

    const eraseLefthandItem = (index: string) => {
        setLeftHandArray((prevArray) =>
        prevArray.filter((item) => item.id !== index))
    };

    const handleAddLeftMathItemValue = (addValue: number) => {
        setLeftHandArray((prevLeftHand) =>
        prevLeftHand.map((item) =>
        item.id === holdLeftHandItem?.id ? {...item, value: Number(item.value) + addValue} : item
        ));
    };
    const handleChangeLeftMathItemVariable = (newVariable: string | null) => {
        setLeftHandArray((prevArray) =>
            prevArray.map((item) =>
            item.id === holdLeftHandItem?.id ? {...item, variable: newVariable} : item)
        );
    };
    const handleAddLeftMathItemPower = (addValue: number) => {
        setLeftHandArray((prevLeftHand) =>
        prevLeftHand.map((item) =>
        item.id === holdLeftHandItem?.id ? {...item, power: Number(item.power) + addValue} : item
        ));
    };

    const moveLeftHandItemLeft = () => {
        if (holdLeftHandItem) {
            if (holdSilverListArrayIndex-1 >= 0) { // check if you can move to the left
                leftHandArray.splice(holdSilverListArrayIndex-1, 0, {id: holdLeftHandItem.id, value: holdLeftHandItem.value, variable: holdLeftHandItem.variable, power: holdLeftHandItem.power}); // duplicate
                leftHandArray.splice(holdSilverListArrayIndex+1, 1); // erase original
                setHoldSilverListArrayIndex(holdSilverListArrayIndex-1) // hold everything else happen automatically
            } else {
                console.log("out of range")
            }
        } else {
            console.log("no selected item")
        }
    };

    const moveLeftHandItemRight = () => { // check if you can move to the right
        if (holdLeftHandItem) {
            if (holdSilverListArrayIndex+1 < leftHandArray.length) {
                leftHandArray.splice(holdSilverListArrayIndex+2, 0, {id: holdLeftHandItem.id, value: holdLeftHandItem.value, variable: holdLeftHandItem.variable, power: holdLeftHandItem.power}); // duplicate
                leftHandArray.splice(holdSilverListArrayIndex, 1); // erase original
                setHoldSilverListArrayIndex(holdSilverListArrayIndex+1) // hold everything else happen automatically
            } else {
                console.log("out of range")
            }
        } else {
            console.log("no selected item")
        }
    };

    const updateSum = useCallback((variable: string | null) => {
        const updatedSum = leftHandArray
            .filter(item => item.variable === variable)
            .map(item => {
                if (variable === null) { // coefficients power values
                    return Number(item.value) ** item.power;
                } else if (variable === "x" || "y" || "z") { // variables don't power values, unlike coefficients
                    return Number(item.value)
                } else {
                return 0
                };
            })
            .reduce((acc, cur) => acc * cur, 1);
        return updatedSum;
    }, [leftHandArray]);

    const updatePower = useCallback((variable: string | null) => {
        const updatedPower = leftHandArray
            .filter(item => item.variable === variable)
            .map(item => {
                return Number(item.power)
            })
            .reduce((acc, cur) => acc + cur, 0);
        return updatedPower;
    }, [leftHandArray]);

    useEffect(() => {
        const foundItem = leftHandArray.find((item) => item.id === holdLeftHandItem?.id);
        if (foundItem) {
            setHoldSilverListArrayIndex(leftHandArray.findIndex((item) => item.id === foundItem.id));
            setHoldLeftHandItem(foundItem);
        } else {
            setHoldSilverListArrayIndex(null);
        }

        // sum for variables
        setLeftHandSum({
            noVar: updateSum(null),
            varX: updateSum("x"),
            powX: updatePower("x"),
            varY: updateSum("y"),
            powY: updatePower("y"),
            varZ: updateSum("z"),
            powZ: updatePower("z"),
        });

        // browser window size
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => { // cleanuup
            window.removeEventListener('resize', handleResize);
          };

      }, [holdLeftHandItem, leftHandArray, updateSum, updatePower]);

    return (
        <SilverListContext.Provider value={{
            leftHandArray,
            setLeftHandArray,
            holdLeftHandItem,
            setHoldLeftHandItem,
            addLeftHandItem,
            eraseLefthandItem,
            handleAddLeftMathItemValue,
            handleAddLeftMathItemPower,
            handleChangeLeftMathItemVariable,
            moveLeftHandItemLeft,
            moveLeftHandItemRight,
            leftHandSum,
            setLeftHandSum,
            holdSilverListArrayIndex,
            setHoldSilverListArrayIndex,
            followCursor,
            setFollowCursor,
            windowSize,
            silverListUIWidth,
            setSilverListUIWidth,
            cursorXCoordinate,
            setCursorXCoordinate,
        }}>
            {children}
        </SilverListContext.Provider>
    );
};

export const useSilverList = () => {
    const context = useContext(SilverListContext);
    if (context === undefined) {
        throw new Error("useSilverList must be used within a SilverListProvider");
    }
    return context;
};