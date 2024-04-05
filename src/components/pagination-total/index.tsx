type PaginationTotalProps = {
  total: number;
  entityName: string;
};

export const PaginationTotal = ({
  total,
  entityName,
}: PaginationTotalProps) => {
  return (
    <span
      style={{
        narginLeft: "16px",
      }}
    >
      <span className="ant-text secondary">{total}</span> {entityName} in total
    </span>
  );
};