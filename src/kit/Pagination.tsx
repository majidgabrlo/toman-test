import ReactPaginate from "react-paginate";

const Pagination = ({
  onChange,
  totalPage,
  page,
}: {
  totalPage: number;
  onChange: (p: number) => void;
  page: number;
}) => {
  return (
    <ReactPaginate
      pageCount={totalPage}
      onPageChange={(p) => {
        onChange(p.selected+1);
      }}
      forcePage={page - 1}
      
      containerClassName="flex items-center justify-center space-x-2"
      pageClassName="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer hover:bg-gray-200"
      activeClassName="bg-blue-500 text-white font-bold"
      disabledClassName="text-gray-400 cursor-not-allowed"
      previousClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200"
      nextClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200"
      breakClassName="flex items-center justify-center w-8 h-8"
      previousLabel="&laquo;"
      nextLabel="&raquo;"
      breakLabel="..."
    />
  );
};

export default Pagination;
