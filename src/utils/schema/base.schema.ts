import { Prop } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import * as uuid from 'uuid';

export class BaseSchema {
    _id?: string;

    /**
     * Sử dụng để transform dữ  liệu từ ObjectId thành dạng string
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
    createdDate: Date;

    @Prop({
        required: false,
        type: Date,
        default: null,
    })
    updatedDate: Date;

    @Prop({
        required: false,
        type: Date,
        default: null,
    })
    deletedDate: Date;
}
