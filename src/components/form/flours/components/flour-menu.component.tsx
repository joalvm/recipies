import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useFloursContext } from '@/context/flours.context';
import { FlourPercentage, useSourdoughContext } from '@/context/sourdough.context';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MoreVertical } from 'lucide-react';

type FlourMenuProps = {
    flour: FlourPercentage;
};

function FlourMenu({ flour }: FlourMenuProps) {
    const { floursPercentage } = useSourdoughContext();
    const { openFlourDialog, removeFlour } = useFloursContext();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openFlourDialog(flour)}>Editar</DropdownMenuItem>
                <DropdownMenuItem onClick={() => removeFlour(flour)} disabled={floursPercentage.size <= 1}>
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default FlourMenu;
