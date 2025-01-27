// deprecated context
import React, { createContext, useState, ReactNode, useContext, useEffect, useCallback } from 'react';

const MathContext = createContext<MathContextType | undefined>(undefined);

interface MathContextProviderProps {
    children: ReactNode;
};

interface LeftHandItem {
    id: string;
    value: number;
    variable: null | string;
    power: number;
};

interface MathContextType {
    leftHand: LeftHandItem[];
    setLeftHand: React.Dispatch<React.SetStateAction<any>>;
    addLeftMathItem: (newLeftHandItem: LeftHandItem) => void;
    holdLeftHandItem: any;
    setHoldLeftHandItem: React.Dispatch<React.SetStateAction<any>>;
    handleChangeLeftMathItemValue: (index: number) => void;
    handleAddLeftMathItemValue: (index: number) => void;
    handleAddLeftMathItemPower: (index: number) => void;
    handleChangeLeftMathItemVariable: (index: string | null) => void;
    eraseLeftMathItem: (index: string) => void;

    leftHandSumNoVar: number;
    setLeftHandSumNoVar: React.Dispatch<React.SetStateAction<any>>;
    leftHandSumVarX: number;
    setLeftHandSumVarX: React.Dispatch<React.SetStateAction<any>>;
    leftHandSumVarY: number;
    setLeftHandSumVarY: React.Dispatch<React.SetStateAction<any>>;
    leftHandSumVarZ: number;
    setLeftHandSumVarZ: React.Dispatch<React.SetStateAction<any>>;
};

export const MathContextProvider: React.FC<MathContextProviderProps> = ({ children }) => {
// states
    const [leftHand, setLeftHand] = useState<{id: any; value: any; variable: any; power: any}[]>([
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
    ]);

    const [leftHandSumNoVar, setLeftHandSumNoVar] = useState(0);
    const [leftHandSumVarX, setLeftHandSumVarX] = useState(0);
    const [leftHandSumVarY, setLeftHandSumVarY] = useState(0);
    const [leftHandSumVarZ, setLeftHandSumVarZ] = useState(0);

    const [holdLeftHandItem, setHoldLeftHandItem] = useState<any>(null);

// functions
    const addLeftMathItem = (newLeftHandItem: LeftHandItem) => {
        setLeftHand((prevArray) => [...prevArray, newLeftHandItem]);
    };

    const handleChangeLeftMathItemValue = (newValue: number) => { //input is 5, set to 5
        setLeftHand((prevArray) =>
            prevArray.map((item) =>
            item.id === holdLeftHandItem ? {...item, value: newValue} : item)
        )
    };

    const handleAddLeftMathItemValue = (addValue: number) => { // input is 5, add 5
        setLeftHand((prevLeftHand) =>
        prevLeftHand.map((item) =>
        item.id === holdLeftHandItem ? {...item, value: String(Number(item.value) + addValue)} : item
        ));
    };

    const handleAddLeftMathItemPower = (addValue: number) => { // input is 5, add 5
        setLeftHand((prevLeftHand) =>
        prevLeftHand.map((item) =>
        item.id === holdLeftHandItem ? {...item, power: String(Number(item.power) + addValue)} : item
        ));
    };

    const handleChangeLeftMathItemVariable = (newVariable: string | null) => {
        setLeftHand((prevArray) =>
            prevArray.map((item) =>
            item.id === holdLeftHandItem ? {...item, variable: newVariable} : item)
        );
    };

    const eraseLeftMathItem = (index: string) => {
        setLeftHand((prevArray) =>
        prevArray.filter((item) => item.id !== index))
        setHoldLeftHandItem(null);
    };

    const updateSum = useCallback((variable: string | null) => {
        const updatedSum = leftHand
        .filter(item => item.variable === variable)
        .map(item => Number(item.value))
        .reduce((acc, cur) => acc + cur, 0);
        return updatedSum;
    }, [leftHand]);

// effects
useEffect(() => {
    const sumNull = updateSum(null)
    const sumX = updateSum("x")
    const sumY = updateSum("y")
    const sumZ = updateSum("z")
    setLeftHandSumNoVar(sumNull);
    setLeftHandSumVarX(sumX);
    setLeftHandSumVarY(sumY);
    setLeftHandSumVarZ(sumZ);
}, [updateSum]);

    return(
        <MathContext.Provider value={{
            leftHand,
            setLeftHand,
            addLeftMathItem,
            holdLeftHandItem,
            setHoldLeftHandItem,
            handleChangeLeftMathItemValue,
            handleChangeLeftMathItemVariable,
            handleAddLeftMathItemValue,
            handleAddLeftMathItemPower,
            eraseLeftMathItem,
            leftHandSumNoVar,
            setLeftHandSumNoVar,
            leftHandSumVarX,
            setLeftHandSumVarX,
            leftHandSumVarY,
            setLeftHandSumVarY,
            leftHandSumVarZ,
            setLeftHandSumVarZ,
        }}>
            {children}
        </MathContext.Provider>
    )
};

export const useMathContext = () => {
    const context = useContext(MathContext);
    if (context === undefined) {
        throw new Error("mathContext eror")
    }
    return context;
};