import { Label } from '@/components/ui/label';
import { FlourPercentage, useSourdoughContext } from '@/context/sourdough.context';
import FlourMenu from './flour-menu.component';
import { Slider } from '@/components/ui/slider';

type FlourProps = {
    flour: FlourPercentage;
};

const Flour = ({ flour }: FlourProps) => {
    const { floursWeight, floursPercentage, flourBaseCode, setFloursPercentage } = useSourdoughContext();

    const handleOnValueChange = (value: number[]) => {
        if (floursPercentage.size <= 1) {
            return;
        }

        const newFlours = new Map(floursPercentage);
        const currentPercentage = newFlours.get(flour.code)!.percentage || 0;

        newFlours.get(flourBaseCode)!.percentage += currentPercentage;
        newFlours.get(flourBaseCode)!.percentage -= value[0];

        newFlours.get(flour.code)!.percentage = value[0];

        setFloursPercentage(newFlours);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label>{flour.name}</Label>
                <div className="flex items-center space-x-2">
                    <FlourMenu flour={flour} />
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <span className="w-8 text-sm">{flour.percentage.toFixed(0)}%</span>
                <Slider
                    value={[flour.percentage]}
                    onValueChange={handleOnValueChange}
                    max={100}
                    step={5}
                    className="flex-grow bg-muted-foreground"
                    disabled={floursPercentage.size === 1}
                />
                <span className="w-16 text-right">{floursWeight.get(flour.code)}g</span>
            </div>
        </div>
    );
};

export default Flour;
