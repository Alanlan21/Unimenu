import { Repository } from 'typeorm';
import { Owner } from './owner.entity';
import { CreateOwnerDto } from './dto/owner.dto';
export declare class OwnerService {
    private ownerRepository;
    constructor(ownerRepository: Repository<Owner>);
    create(createOwnerDto: CreateOwnerDto): Promise<Owner>;
    findAll(): Promise<Owner[]>;
    findOne(id: number): Promise<Owner>;
    update(id: number, updateData: Partial<Owner>): Promise<Owner>;
    remove(id: number): Promise<void>;
}
