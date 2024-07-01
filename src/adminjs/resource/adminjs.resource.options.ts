/**
 * Common options
 * */
export const CommonOptions = {
    properties: {
        createdAt: {
            isVisible: {
                edit: false,
                show: true,
                list: true,
                filter: true,
            },
        },

        updatedAt: {
            isVisible: {
                edit: false,
                show: true,
                list: true,
                filter: true,
            },
        },
    },
    sort: {
        sortBy: 'createdAt',
        direction: 'desc',
    },
};

export const UserReourceOptions = {
    /**
   - Sử dụng để chọn những trường hiển thị tại các màn tương ứng: Show, edit, create, filter
      listProperties: ['id', 'name', 'createdAt'],
      filterProperties: ['id', 'name', 'createdAt'],
      editProperties: ['name'],
      showProperties: ['id', 'name', 'createdAt'],
   */

    /**
     * Sử dụng properties để thực hiện cấu hình ẩn những trường nhất định
     * Có 2 phương thức ẩn dữ liệu:
     *    1. Ẩn vĩnh viễn một trường dữ liệu
     *    2. Ẩn trường dữ liệu đối với những trường hợp cụ thể
     * Thao khảo cách làm dưới đây:
     * */
    properties: {
        /**
         * Ẩn một trường nhất định
         * */
        password: {
            isVisible: {
                edit: true,
                show: false,
                list: false,
                filter: false,
            },
        },

        roles: {
            type: 'string',
            availableValues: [
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
                { value: 'guest', label: 'Guest' },
            ],
            isArray: false,
        },
        /**
     - Ẩn theo từng trường hợp nhất định
        createdAt: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },

        updatedAt: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
     */

        ...CommonOptions.properties,
    },

    /**
     * Sử dụng sort để cấu hình sắp xếp mặc định cho AdminJS
     * */
    sort: {
        sortBy: 'createdAt',
        direction: 'desc',
    },
};
