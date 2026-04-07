// src/components/Reusable/ReusableTable.tsx
import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search, Download, Printer, LayoutGrid, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface Column {
    Header: string;
    accessor: string;
    Cell?: (row: any) => React.ReactNode;
    sortable?: boolean;
}

interface ReusableTableProps {
    columns: Column[];
    data: any[];
    title?: string;
    icon?: React.ElementType;
    showSearch?: boolean;
    showExport?: boolean;
    showPrint?: boolean;
    itemsPerPage?: number;
    itemsPerPageOptions?: number[];
    onSearch?: (query: string) => void;
    onExport?: () => void;
    onPrint?: () => void;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
    columns,
    data,
    title,
    icon: Icon,
    showSearch = true,
    showExport = true,
    showPrint = true,
    itemsPerPage = 10,
    itemsPerPageOptions = [10, 25, 50, 100],
    onSearch,
    onExport,
    onPrint,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
        if (onSearch) onSearch(query);
    };

    const handleSort = (accessor: string) => {
        if (sortColumn === accessor) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(accessor);
            setSortDirection('asc');
        }
    };

    // Filter and sort data
    const processedData = useMemo(() => {
        let result = [...data];

        // Filter
        if (searchQuery) {
            result = result.filter(row => {
                return columns.some(column => {
                    const value = column.Cell ? column.Cell(row) : row[column.accessor];
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(searchQuery.toLowerCase());
                    }
                    if (typeof value === 'number') {
                        return value.toString().includes(searchQuery);
                    }
                    return false;
                });
            });
        }

        // Sort
        if (sortColumn) {
            result.sort((a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortDirection === 'asc'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
                }

                return 0;
            });
        }

        return result;
    }, [data, searchQuery, sortColumn, sortDirection, columns]);

    // Pagination
    const totalPages = Math.ceil(processedData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = processedData.slice(startIndex, endIndex);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pageNumbers.push(i);
                }
            }
        }
        return pageNumbers;
    };

    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));

    return (
        <div className="w-full bg-white rounded-xl shadow-md">
            {/* Header with Title and Actions */}
            {(title || showSearch || showExport || showPrint) && (
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2">
                            {Icon && (
                                <div className="p-1.5 bg-deepTeal/10 rounded-lg">
                                    <Icon className="h-5 w-5 text-deepTeal" />
                                </div>
                            )}
                            {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
                        </div>

                        <div className="flex items-center gap-2">
                            {showSearch && (
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-2 w-2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="pl-9 pr-3 py-1.5 text-sm border border-deepTeal rounded-lg focus:ring-2 focus:ring-deepTeal focus:border-transparent outline-none w-4"
                                    />
                                </div>
                            )}

                            {showExport && onExport && (
                                <button
                                    onClick={onExport}
                                    className="p-1.5 text-gray-500 hover:text-deepTeal hover:bg-deepTeal/10 rounded-lg transition-colors"
                                    title="Export to CSV"
                                >
                                    <Download className="h-4 w-4" />
                                </button>
                            )}

                            {showPrint && onPrint && (
                                <button
                                    onClick={onPrint}
                                    className="p-1.5 text-gray-500 hover:text-deepTeal hover:bg-deepTeal/10 rounded-lg transition-colors"
                                    title="Print"
                                >
                                    <Printer className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-sm md:text-base">
                    <thead className="bg-deepTeal">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.accessor}
                                    className={`px-4 py-3 text-left font-semibold text-white whitespace-nowrap border-b border-gray-200 ${column.sortable ? 'cursor-pointer hover:text-deepTeal select-none' : ''
                                        }`}
                                    onClick={() => column.sortable && handleSort(column.accessor)}
                                >
                                    <div className="flex items-center gap-1">
                                        {column.Header}
                                        {column.sortable && sortColumn === column.accessor && (
                                            sortDirection === 'asc' ? (
                                                <ChevronUp className="h-3 w-3" />
                                            ) : (
                                                <ChevronDown className="h-3 w-3" />
                                            )
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-6 text-center text-gray-500"
                                >
                                    No data available.
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    className="border-b hover:bg-gray-50 transition-colors"
                                >
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={`${rowIndex}-${column.accessor}-${colIndex}`}
                                            className="px-4 py-3 text-gray-800 max-w-[220px] truncate"
                                        >
                                            {column.Cell ? column.Cell(row) : row[column.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Rows per page selector */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Rows per page:</span>
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => {
                                        setRowsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="px-2 py-1 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-deepTeal"
                                >
                                    {itemsPerPageOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to{' '}
                                <span className="font-medium text-gray-900">{Math.min(endIndex, processedData.length)}</span> of{' '}
                                <span className="font-medium text-gray-900">{processedData.length}</span> entries
                            </div>
                        </div>

                        {/* Pagination controls */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={goToFirstPage}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                title="First Page"
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </button>
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                title="Previous Page"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            <div className="flex gap-1 mx-1">
                                {getPageNumbers().map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all ${currentPage === pageNum
                                            ? 'bg-deepTeal text-white shadow-sm'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                title="Next Page"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                            <button
                                onClick={goToLastPage}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                title="Last Page"
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReusableTable;