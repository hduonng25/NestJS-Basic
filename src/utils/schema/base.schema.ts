import { Prop } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import * as uuid from 'uuid';

export class BaseSchema {
    _id?: string;

    /**
     * Sử dụng để transform dữ liệu từ ObjectId thành dạng string
     */
    @Prop({
        required: false,
        type: String,
        default: () => uuid.v1(),
    })
    @Transform((item) => item.obj.toString())
    id: string;

    @Prop({
        required: false,
        type: Date,
        default: new Date(),
    })
    createdAt: Date;

    @Prop({
        required: false,
        type: Date,
        default: null,
    })
    updatedAt: Date;

    @Prop({
        required: false,
        type: Date,
        default: null,
        
    })
    deletedDate: Date;
}
