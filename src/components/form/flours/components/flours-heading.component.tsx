import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useFloursContext } from '@/context/flours.context';
import { Plus, Wheat } from 'lucide-react';

function FloursHeading() {
    const { openFlourDialog, isDialogOpen } = useFloursContext();

    return (
        <div className="flex items-center justify-between">
            <Label className="flex items-center text-lg font-semibold">
                <Wheat className="w-5 h-5 mr-2" /> Harinas
            </Label>
            <Button variant="ghost" size="icon" disabled={isDialogOpen} onClick={() => openFlourDialog()}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default FloursHeading;
