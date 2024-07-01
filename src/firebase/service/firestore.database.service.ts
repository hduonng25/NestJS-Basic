import { Injectable } from '@nestjs/common';
import { Success } from '@Utils/result';
import * as fs from 'firebase-admin';
import { DataInterface, FindOneInterface } from '../interface';

@Injectable()
export class FirestoreDatabaseService {
    constructor() {}

    private async getDatabase() {
        return await fs.firestore();
    }

    private async getCollection(collection: string) {
        const database = await this.getDatabase();
        return await database.collection(collection);
    }

    public async findOne(collectionName: string, data: FindOneInterface) {
        const userCollection = await this.getCollection(collectionName);
        const userDocs = await userCollection.where(data.key, data.opStr, data.value).get();

        if (!userDocs.docs) {
            return null;
        }

        return userDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))[0];
    }

    public async create(collectionName: string, data: DataInterface) {
        const collection = await this.getCollection(collectionName);
        const docs = await collection.doc(data.id);
        await docs.set({
            ...data,
        });

        return Success.create('Create in fire base successfully');
    }

    public async update(collectionName: string, data: DataInterface) {
        const collection = await this.getCollection(collectionName);
        const docs = await collection.doc(data.id);
        await docs.set(
            {
                ...data,
            },
            { merge: true },
        );

        return Success.ok('Update successfully');
    }

    public async delete(collectionName: string, id: string) {
        const collection = await this.getCollection(collectionName);
        const docs = await collection.doc(id);
        await docs.delete();

        return Success.ok('Delete successfully');
    }

    public async findAll(collectionName: string) {
        const collection = await this.getCollection(collectionName);
        const docs = await collection.limit(50).get();
        return docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
}
