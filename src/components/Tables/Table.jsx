import React from "react";
import ActionList from "./ActionList";

const Table = ({ columns, data, renderRow, actionList = [] }) => {
  const isActions = Boolean(actionList.length);
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.Header}
              </th>
            ))}

            {isActions && (
              <th
                key={"actions"}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.accessor} className="px-6 py-4 whitespace-nowrap">
                  {renderRow ? renderRow(row, col) : row[col.accessor]}
                </td>
              ))}
              {isActions && (
                <td className="">
                  <ActionList rowData={row} actions={actionList} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
