import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

interface Props{
    page: number
    setPage: (page: number) => void
    meta: {
        totalPages: number
    }
}

export const Paginator: React.FC<Props> = ({ page, meta, setPage }) => {
    return (
        <Pagination className="mt-12">
            <PaginationContent>

                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => page > 1 && setPage(page - 1)}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {/* Pages */}
                {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                    .slice(
                        Math.max(0, page - 2),
                        Math.min(meta.totalPages, page + 1)
                    )
                    .map((p) => (
                        <PaginationItem key={p}>
                            <PaginationLink
                                isActive={p === page}
                                onClick={() => setPage(p)}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                {/* Ellipsis */}
                {page + 1 < meta.totalPages && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => page < meta.totalPages && setPage(page + 1)}
                        className={page === meta.totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}