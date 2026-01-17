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
    totalPages: number
    filter?: string
}

export const Paginator: React.FC<Props> = ({ page, totalPages, filter }) => {
    const buildHref = (newPage: number) => {
        const params = new URLSearchParams()
        params.set("page", String(newPage))
        if (filter) params.set("tag", filter)
        return `?${params.toString()}`
    }

    return (
        <Pagination className="mt-12">
            <PaginationContent>

                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        href={buildHref(page - 1)}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {/* Pages */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(
                        Math.max(0, page - 2),
                        Math.min(totalPages, page + 1)
                    )
                    .map((p) => (
                        <PaginationItem key={p}>
                            <PaginationLink
                                isActive={p === page}
                                href={buildHref(p)}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                {/* Ellipsis */}
                {page + 1 < totalPages && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Next */}
                {page < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            href={buildHref(page + 1)}
                        />
                    </PaginationItem>
                )}

            </PaginationContent>
        </Pagination>
    )
}
