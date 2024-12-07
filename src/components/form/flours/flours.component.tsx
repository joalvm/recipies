import { useSourdoughContext } from '@/context/sourdough.context';
import Flour from './components/flour.component';
import FlourFormDialog from './components/flour-form-dialog.component';
import FloursHeading from './components/flours-heading.component';
import { FloursProvider } from '@/context/flours.context';

function Flours() {
    const { floursPercentage } = useSourdoughContext();

    return (
        <FloursProvider>
            <div className="space-y-4 ">
                <FloursHeading />
                {Array.from(floursPercentage.values()).map((flour) => (
                    <Flour key={flour.code} flour={flour} />
                ))}
            </div>
            <FlourFormDialog />
        </FloursProvider>
    );
}

export default Flours;
