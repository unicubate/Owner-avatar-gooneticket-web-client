import { PaymentModel } from "../api-site/payment";
interface Props {
  data: any;
  setPageItem: any;
  setPreviewPageItem: any;
  setNextPageItem: any;
  paginate: any;
  isPreviousData: any;
  pageItem: number;
}

export type SortModel = "ASC" | "DESC";

export type PaymentType = "CARD" | "PAYPAL" | "PHONE";

export type ModelType =
  | "ORGANIZATION"
  | "CAMPAIGN"
  | "DONATION"
  | "PRODUCT"
  | "COMMISSION"
  | "MEMBERSHIP"
  | "GIFT"
  | "HELP"
  | "POST"
  | "GALLERY"
  | "COMMENT";

export type PaginationRequest = {
  organizationId?: string;
  isPaginate?: "true" | "false"
  search?: string;
  sort: SortModel;
  page?: number;
  take?: number;
};

export type PaginationResponse = {
  total: number;
  per_page: number;
  current_page: number;
  next_page: number;
  last_page: number;
  skip: number;
  sort: SortModel;
  total_page: number;
  total_value: number;
};

export const PaginationItem: React.FC<Props> = ({
  data,
  setPageItem,
  setPreviewPageItem,
  setNextPageItem,
  paginate,
  isPreviousData,
  pageItem,
}) => {
  return (
    <>
      {data?.data?.total > 0 && (
        <>
          <div className="separator separator-dashed my-2"></div>

          <div className="d-flex flex-center mb-0">
            <ul className="pagination">
              <li
                className={`page-item previous ${
                  (isPreviousData || pageItem <= 1) && "disabled"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setPageItem(setPreviewPageItem);
                    paginate(pageItem - 1);
                  }}
                  className="page-link"
                >
                  <i className="previous"></i>
                </button>
              </li>
              <li className="page-item active">
                <button type="button" className="page-link">
                  {pageItem}
                </button>
              </li>
              <li
                className={`page-item next ${
                  !isPreviousData &&
                  data?.data?.total_page === pageItem &&
                  "disabled"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (
                      !isPreviousData &&
                      data?.data?.total_page !== pageItem
                    ) {
                      setPageItem(setNextPageItem);
                      paginate(pageItem + 1);
                    }
                  }}
                  className="page-link"
                >
                  <i className="next"></i>
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};
