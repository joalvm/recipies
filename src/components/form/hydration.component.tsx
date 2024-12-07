import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Droplet } from 'lucide-react';
import { useSourdoughContext } from '@/context/sourdough.context';

const HydrationSlider = () => {
    const { hydrationPercentage, setHydrationPercentage, waterWeight } = useSourdoughContext();

    return (
        <div className="space-y-2">
            <Label htmlFor="hydration" className="flex items-center">
                Hidratación <Droplet className="w-4 h-4 ml-2" />
            </Label>
            <div className="flex items-center space-x-2">
                <span className="w-8 text-sm">{hydrationPercentage}%</span>
                <Slider
                    id="hydration"
                    min={50}
                    max={100}
                    step={5}
                    value={[hydrationPercentage]}
                    onValueChange={(value) => setHydrationPercentage(value[0])}
                    className="flex-grow"
                />
                <div className="w-16 text-right">
                    <span className="font-semibold">{waterWeight}g</span>
                </div>
            </div>
        </div>
    );
};

export default HydrationSlider;
