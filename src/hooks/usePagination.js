import { useState } from "react";

export default function usePagination(data, perPage = 16) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / perPage);

    const displayedData = data.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    return {
        currentPage,
        setCurrentPage,
        totalPages,
        displayedData,
    };
}