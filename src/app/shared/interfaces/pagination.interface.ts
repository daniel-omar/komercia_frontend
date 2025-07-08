export interface Pagination {
    current_page: number;
    new_page?: number;
    per_page: number;
    total?: number;
    pages?: number;
}