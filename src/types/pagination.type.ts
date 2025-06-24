export interface IPaginationQueries {
  take?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface IPaginationMeta {
  page: number;
  take: number;
  total: number;
  pageCount: number;
}

export interface IPaginationMetaCategory {
  totalData: number;
  currentPage: number;
  totalPages: number;
}
