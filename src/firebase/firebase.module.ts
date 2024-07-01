import { AllConfigType } from '@Config/types';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseModule } from 'nestjs-firebase';
import { FirestoreDatabaseService, RealtimeDatabaseService } from './service';

@Module({
    imports: [
        FirebaseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService<AllConfigType>) => ({
                googleApplicationCredential: configService.getOrThrow('firebase.firestoreDatabase', {
                    infer: true,
                }),
            }),
        }),
    ],
    providers: [RealtimeDatabaseService, FirestoreDatabaseService],
    controllers: [],
})
export class FirebaseModules {}
