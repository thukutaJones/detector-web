import { Edit, Trash2 } from "lucide-react";
import React from "react";

interface Term {
  id: string;
  dateAdded: string;
  name: string;
  status: "active" | "inactive";
}

interface TermsTableProps {
  filteredTerms: Term[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

const TermsTable: React.FC<TermsTableProps> = ({
  filteredTerms,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div className="flex-1 overflow-auto px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTerms.map((term: any, index: number) => (
                <tr
                  key={index?.toString()}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {term?.id || term?._id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(term?.created).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {term.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDelete(term?.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 transform hover:scale-105 
                             bg-red-100 text-red-700 hover:bg-red-200
                        `}
                      >
                        <>
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </>
                      </button>
                      <button
                        onClick={() => handleEdit(term)}
                        className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-medium hover:bg-yellow-200 transition-all duration-200 transform hover:scale-105"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTerms.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-sm text-gray-400"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TermsTable;
