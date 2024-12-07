import { createContext, useContext, useState, PropsWithChildren, Dispatch, SetStateAction, useEffect } from 'react';
import md5 from 'md5';

export type FlourPercentage = {
    code: string;
    name: string;
    percentage: number;
};

type SourdoughContextType = {
    totalMass: number;
    hydrationPercentage: number;
    starterPercentage: number;
    saltPercentage: number;
    floursPercentage: Map<string, FlourPercentage>;
    totalFlourWeight: number;
    starterWeight: number;
    saltWeight: number;
    waterWeight: number;
    floursWeight: Map<string, number>;
    flourBaseCode: string;
    setTotalMass: Dispatch<SetStateAction<number>>;
    setHydrationPercentage: Dispatch<SetStateAction<number>>;
    setStarterPercentage: Dispatch<SetStateAction<number>>;
    setSaltPercentage: Dispatch<SetStateAction<number>>;
    setFloursPercentage: Dispatch<SetStateAction<Map<string, FlourPercentage>>>;
    setFlourBaseCode: Dispatch<SetStateAction<string>>;
};

const SourdoughContext = createContext<SourdoughContextType | undefined>(undefined);

const initialName = 'Harina normal';
const initialCode = md5(initialName);

const initialValues = {
    totalMass: 1000,
    hydration: 70,
    starterPercentage: 20,
    saltPercentage: 2,
};

const initialFlour: Map<string, FlourPercentage> = new Map([
    [initialCode, { code: initialCode, name: initialName, percentage: 100 }],
]);

export const SourdoughProvider = ({ children }: PropsWithChildren) => {
    const [totalMass, setTotalMass] = useState(initialValues.totalMass);

    // Porcentajes
    const [hydrationPercentage, setHydrationPercentage] = useState(initialValues.hydration);
    const [starterPercentage, setStarterPercentage] = useState(initialValues.starterPercentage);
    const [saltPercentage, setSaltPercentage] = useState(initialValues.saltPercentage);
    const [floursPercentage, setFloursPercentage] = useState<Map<string, FlourPercentage>>(initialFlour);

    // El código de la harina base, esto permite poder descontar la harina base de las demás harinas.
    const [flourBaseCode, setFlourBaseCode] = useState(initialCode);

    // Pesos
    const [totalFlourWeight, setTotalFlourWeight] = useState(0);
    const [starterWeight, setStarterWeight] = useState(0);
    const [saltWeight, setSaltWeight] = useState(0);
    const [waterWeight, setWaterWeight] = useState(0);
    const [floursWeight, setFloursWeight] = useState<Map<string, number>>(new Map());

    useEffect(() => {
        calculateWeights();
    }, [totalMass, hydrationPercentage, starterPercentage, saltPercentage, floursPercentage]);

    const calculateWeights = () => {
        const totalFlourWeight = totalMass / (1 + hydrationPercentage / 100);
        const starterWeight = (totalFlourWeight * starterPercentage) / 100;
        const flourInStarter = starterWeight / 2;
        const waterInStarter = starterWeight / 2;

        const additionalFlour = totalFlourWeight - flourInStarter;
        const totalWater = (totalFlourWeight * hydrationPercentage) / 100;

        setTotalFlourWeight(Math.round(totalFlourWeight));
        setStarterWeight(Math.round(starterWeight));
        setSaltWeight(Math.round((totalFlourWeight * saltPercentage) / 100));
        setWaterWeight(Math.round(totalWater - waterInStarter));

        const newFloursWeight = new Map<string, number>();

        for (const value of floursPercentage.values()) {
            const flourWeight = (additionalFlour * value.percentage) / 100;

            newFloursWeight.set(value.code, Math.round(flourWeight));
        }

        setFloursWeight(newFloursWeight);
    };

    return (
        <SourdoughContext.Provider
            value={{
                totalMass,
                hydrationPercentage,
                starterPercentage,
                saltPercentage,
                floursPercentage,
                totalFlourWeight,
                starterWeight,
                saltWeight,
                waterWeight,
                floursWeight,
                flourBaseCode,
                setTotalMass,
                setHydrationPercentage,
                setStarterPercentage,
                setSaltPercentage,
                setFloursPercentage,
                setFlourBaseCode,
            }}>
            {children}
        </SourdoughContext.Provider>
    );
};

export const useSourdoughContext = () => {
    const context = useContext(SourdoughContext);
    if (!context) {
        throw new Error('useSourdoughContext must be used within a SourdoughProvider');
    }
    return context;
};
