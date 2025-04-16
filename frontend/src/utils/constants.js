export const TASK_STATUS = {
    PENDING: 'PENDING',
    DONE: 'DONE',
}

export const ITEMS_PER_PAGE = 10

export const API_URLS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
    },
    TASKS: {
        BASE: '/api/tasks',
        GET_TASKS: '/api/tasks',
        CREATE_TASK: '/api/tasks',
        UPDATE_TASK: (id) => `/api/tasks/${id}`,
        DELETE_TASK: (id) => `/api/tasks/${id}`,
    },
}

export const DATE_FORMATS = {
    DISPLAY_DATE: 'MMM dd, yyyy',
    DISPLAY_DATE_TIME: 'MMM dd, yyyy h:mm a',
    API_DATE: 'yyyy-MM-dd',
}