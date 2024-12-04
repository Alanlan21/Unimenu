import { OwnerService } from '../service/owner.service';
import { CreateOwnerDto } from '../dto/owner.dto';
import { Owner } from '../entity/owner.entity';
export declare class OwnerController {
    private readonly ownerService;
    constructor(ownerService: OwnerService);
    create(createOwnerDto: CreateOwnerDto): Promise<Owner>;
    findAll(): Promise<Owner[]>;
    findOne(id: string): Promise<Owner>;
    update(id: string, updateData: Partial<Owner>): Promise<Owner>;
    remove(id: string): Promise<void>;
}
