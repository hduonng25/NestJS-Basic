import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('user')
export class ProcessorUser {
    /**
     * Đánh dấu bộ xử lý công việc(job processor) cho một hàng đợi(queue) cụ thể
     * Khi phương thức gọi đến
     *     - Phương thức sẽ ngay lập tức trả ra kết quả
     *     - Hàng đợi sẽ thực hiện sau
     * @param job
     */
    @Process('first')
    public async first(job: Job<unknown>) {
        try {
            console.log(job.data);
            console.log('Process first');
            return 'hduong';
        } catch (err) {
            console.log(err);
        }
    }
}
