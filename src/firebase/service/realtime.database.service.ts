import { Injectable } from '@nestjs/common';
import { DataSnapshot, get, push, ref, set } from 'firebase/database';
import { firebaseDatabase } from '../config';

@Injectable()
export class RealtimeDatabaseService {
    constructor() {}

    /**
     * Create record in realtime databse
     * @param data
     * @param path
     */
    public async create(data: any, path: string): Promise<void> {
        const dataRef = ref(firebaseDatabase, path);
        const newData = push(dataRef, { dataRef: data });
        await set(newData, data);
    }

    /**
     * Get data in realtime database
     * @param path
     */
    public async findAll(path: string): Promise<any> {
        const dataRef = ref(firebaseDatabase, path);
        const snapShot: DataSnapshot = await get(dataRef);
        return snapShot.val();
    }
}
