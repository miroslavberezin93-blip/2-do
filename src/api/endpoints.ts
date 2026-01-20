const endpoints = {
    auth: {
        register: { path: "/api/auth/register" },
        login: { path: "/api/auth/login" },
        logout: { path: "/api/auth/logout" }
    },
    user: {
        user: { path: "/api/users" },
        updateUsername: { path: "/api/auth/update/username" },
        updatePassword: { path: "/api/auth/update/password" }
    },
    tasks: { 
        default: { path: "/api/tasks" },
        byId: (id: number) => ({ path: `/api/tasks/${id}` })
    }
} as const
export default endpoints