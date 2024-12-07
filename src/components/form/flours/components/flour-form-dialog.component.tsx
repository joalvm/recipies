import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useFloursContext } from '@/context/flours.context';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useEffect, useState } from 'react';
import { useSourdoughContext } from '@/context/sourdough.context';
import { Button } from '@/components/ui/button';

function FlourFormDialog() {
    const { floursPercentage } = useSourdoughContext();
    const { isDialogOpen, setIsDialogOpen, editingFlour, handleFlourSubmit } = useFloursContext();
    const [name, setName] = useState('');
    const [percentage, setPercentage] = useState(10);

    useEffect(() => {
        if (editingFlour === null) {
            setName('');
            setPercentage(10);

            return;
        }

        setName(editingFlour.name);
        setPercentage(editingFlour.percentage);
    }, [isDialogOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleFlourSubmit(name, percentage);
    };

    const isDisabled = () => {
        return floursPercentage.size <= 1 && editingFlour !== null;
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle>{editingFlour ? 'Editar harina' : 'Añadir nueva harina'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        <div className="space-y-2">
                            <Label htmlFor="flour-name">Nombre de la harina</Label>
                            <Input id="flour-name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="flour-percentage">Porcentaje</Label>
                            <div className="flex items-center space-x-2">
                                <Slider
                                    id="flour-percentage"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={[percentage]}
                                    onValueChange={(value) => setPercentage(value[0])}
                                    disabled={isDisabled()}
                                />
                                <Label className="w-8 text-right">{percentage}%</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center justify-end">
                            <Button type="submit">{editingFlour ? 'Actualizar' : 'Añadir'} harina</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default FlourFormDialog;
