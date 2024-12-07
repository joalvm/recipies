import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import { FlourPercentage, useSourdoughContext } from './sourdough.context';
import md5 from 'md5';

type FloursContextType = {
    isDialogOpen: boolean;
    editingFlour: FlourPercentage | null;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    openFlourDialog: (flour?: FlourPercentage) => void;
    removeFlour: (flourToRemove: FlourPercentage) => void;
    handleFlourSubmit: (name: string, percentage: number) => void;
};

const Context = createContext<FloursContextType | undefined>(undefined);

export function FloursProvider({ children }: PropsWithChildren) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingFlour, setEditingFlour] = useState<FlourPercentage | null>(null);
    const { floursPercentage, setFloursPercentage, flourBaseCode, setFlourBaseCode } = useSourdoughContext();

    const openFlourDialog = (flour?: FlourPercentage) => {
        setEditingFlour(flour || null);
        setIsDialogOpen(true);
    };

    const removeFlour = (flourToRemove: FlourPercentage) => {
        if (floursPercentage.size === 1) {
            return;
        }

        const newFlours = new Map(floursPercentage);

        newFlours.delete(flourToRemove.code);

        if (flourToRemove.code === flourBaseCode) {
            setFlourBaseCode(Array.from(newFlours.keys())[0]);
        }

        setFloursPercentage(newFlours);
    };

    const editFlour = (code: string, name: string, percentage: number) => {
        const newFlours = new Map(floursPercentage);
        const currentPercentage = newFlours.get(code)!.percentage || 0;

        newFlours.get(code)!.name = name;

        if (currentPercentage !== percentage) {
            newFlours.get(flourBaseCode)!.percentage += currentPercentage;
            newFlours.get(flourBaseCode)!.percentage -= percentage;

            newFlours.get(code)!.percentage = percentage;
        }

        setFloursPercentage(newFlours);
    };

    const addFlour = (name: string, percentage: number) => {
        const newFlours = new Map(floursPercentage);

        newFlours.get(flourBaseCode)!.percentage -= percentage;
        newFlours.set(md5(name), { code: md5(name), name, percentage });

        setFloursPercentage(newFlours);
    };

    const handleFlourSubmit = (name: string, percentage: number) => {
        if (editingFlour) {
            editFlour(editingFlour.code, name, percentage);
        } else {
            addFlour(name, percentage);
        }

        setIsDialogOpen(false);
        setEditingFlour(null);
    };

    return (
        <Context.Provider
            value={{
                isDialogOpen,
                editingFlour,
                setIsDialogOpen,
                openFlourDialog,
                removeFlour,
                handleFlourSubmit,
            }}>
            {children}
        </Context.Provider>
    );
}

export function useFloursContext() {
    const context = useContext(Context);

    if (!context) {
        throw new Error('useFloursContext must be used within a FloursProvider');
    }

    return context;
}
