export type OrderType = 'asc' | 'desc';

export type PaginationType = {
  search?: string;
  filter?: any;
  skip?: number;
  take?: number;
  userId?: string;
  sortBy?: string;
  cursor?: string;
  order?: OrderType;
  page?: number;
};

export type PaginationResponseType = {
  found: number;
  took: number;
  skipped: number;
  sort: any;
  page: {
    current: number;
    last: number;
  };
  next_cursor: string;
};
