import { MenuItem } from '../menuItem/menuItem.entity';
import { Owner } from '../owner/owner.entity';
export declare class Store {
    id: number;
    name: string;
    logoUrl: string;
    isOpen: boolean;
    CNPJ: string;
    email: string;
    senha: string;
    menuItems: MenuItem[];
    owner: Owner;
}
