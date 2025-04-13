import { Response } from 'express';
export declare class RedirectController {
    handleSuccess(orderId: string, res: Response): Promise<void>;
    handleCancel(orderId: string, res: Response): Promise<void>;
}
