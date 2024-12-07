import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import { useSourdoughContext } from '@/context/sourdough.context';

const StarterSlider = () => {
    const { starterPercentage, setStarterPercentage, starterWeight } = useSourdoughContext();

    return (
        <div className="space-y-2">
            <Label htmlFor="starter" className="flex items-center">
                Masa madre <Loader className="w-4 h-4 ml-2" />
            </Label>
            <div className="flex items-center space-x-2">
                <span className="w-8 text-sm">{starterPercentage}%</span>
                <Slider
                    id="starter"
                    min={5}
                    max={40}
                    step={5}
                    value={[starterPercentage]}
                    onValueChange={(value) => setStarterPercentage(value[0])}
                    className="flex-grow"
                />
                <div className="w-16 text-right">
                    <span className="font-semibold text-right">{starterWeight}g</span>
                </div>
            </div>
        </div>
    );
};

export default StarterSlider;
