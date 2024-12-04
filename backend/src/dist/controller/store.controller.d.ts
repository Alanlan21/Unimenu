import { StoreService } from '../service/store.service';
import { CreateStoreDto } from '../dto/store.dto';
import { Store } from '../entity/store.entity';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    create(createStoreDto: CreateStoreDto): Promise<Store>;
    search(query: string): Promise<Store[]>;
    findAll(): Promise<Store[]>;
    findOne(id: number): Promise<Store>;
    remove(id: number): Promise<void>;
}
