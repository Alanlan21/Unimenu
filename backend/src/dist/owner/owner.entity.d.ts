import { Store } from '../store/store.entity';
export declare class Owner {
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    orgao_emissor_rg: string;
    dados_bancarios_banco: string;
    dados_bancarios_agencia: string;
    dados_bancarios_conta: string;
    dados_bancarios_digito: string;
    stores: Store[];
}
