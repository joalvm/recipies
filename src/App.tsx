import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HydrationSlider from './components/form/hydration.component';
import TotalWeightInput from './components/form/total-weight.component';
import StarterSlider from './components/form/starter.component';
import SaltSlider from './components/form/salt.component';
import Flours from './components/form/flours/flours.component';
import { Separator } from './components/ui/separator';

export default function SourdoughCalculator() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Calculadora de Pan de Masa Madre</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <TotalWeightInput />
                    <Flours />
                    <Separator />
                    <HydrationSlider />
                    <StarterSlider />
                    <SaltSlider />
                </CardContent>
            </Card>
        </div>
    );
}
