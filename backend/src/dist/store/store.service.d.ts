import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/store.dto';
import { Owner } from '../owner/owner.entity';
export declare class StoreService {
    private storeRepository;
    private ownerRepository;
    search(query: string): Store[] | PromiseLike<Store[]>;
    constructor(storeRepository: Repository<Store>, ownerRepository: Repository<Owner>);
    create(createStoreDto: CreateStoreDto): Promise<Store>;
    findAll(): Promise<Store[]>;
    findOne(id: number): Promise<Store>;
    update(id: number, updateData: Partial<Store>): Promise<Store>;
    remove(id: number): Promise<void>;
}
