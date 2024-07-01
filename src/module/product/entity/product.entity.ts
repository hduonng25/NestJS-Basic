import { GroupConstant } from '@Utils/constant';
import { BaseEntity } from '@Utils/entity';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Products' })
export class ProductEntity extends BaseEntity {
    /**
     * Sử dụng @Expose để hiển thị data theo group riêng biệt
     * */
    @Expose({
        groups: [GroupConstant.ADMIN, GroupConstant.STAFF],
    })
    @Column({ type: 'text', nullable: false })
    name: string;

    /**
     * Sử dụng @Exclude để loại trừ trường dữ liệu password khỏi data trả ra VD: Password
     * Sử dụng thuộc tính toPlainOnly: true
     *    - nhằm loại bỏ trường password khi chuyển đổi thành dạng Object khi sử dụng instanceToPlain
     * */
    @Exclude({ toPlainOnly: false })
    @Column({ type: 'bigint', nullable: false })
    quantity: number;
}
