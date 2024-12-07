import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { SatelliteIcon as Salt } from 'lucide-react';
import { useSourdoughContext } from '@/context/sourdough.context';

const SaltSlider = () => {
    const { saltPercentage, setSaltPercentage, saltWeight } = useSourdoughContext();

    return (
        <div className="space-y-2">
            <Label htmlFor="salt" className="flex items-center">
                Sal <Salt className="w-4 h-4 ml-2" />
            </Label>
            <div className="flex items-center space-x-2">
                <span className="w-8 text-sm">{saltPercentage}%</span>
                <Slider
                    id="salt"
                    min={1}
                    max={5}
                    step={0.1}
                    value={[saltPercentage]}
                    onValueChange={(value) => setSaltPercentage(value[0])}
                    className="flex-grow"
                />
                <div className="w-16 text-right">
                    <span className="font-semibold">{saltWeight}g</span>
                </div>
            </div>
        </div>
    );
};

export default SaltSlider;
