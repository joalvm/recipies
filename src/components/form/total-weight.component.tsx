import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSourdoughContext } from '@/context/sourdough.context';

const TotalWeightInput = () => {
    const { totalMass, setTotalMass } = useSourdoughContext();
    return (
        <div className="space-y-2">
            <Label htmlFor="total-weight">Peso total deseado (g)</Label>
            <Input
                id="total-weight"
                type="number"
                value={totalMass}
                onChange={(e) => setTotalMass(Number(e.target.value))}
                min={0}
            />
        </div>
    );
};

export default TotalWeightInput;
