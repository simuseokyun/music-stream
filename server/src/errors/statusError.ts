class StatusError extends Error {
    status: number;
    constructor(status: number) {
        super();
        this.status = status;
        this.name = 'StatusError';
    }
}

export default StatusError;
