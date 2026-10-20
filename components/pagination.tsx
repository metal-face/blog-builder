import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

interface Props {
    numberOfPages: number;
    setPage: Dispatch<SetStateAction<number>>;
    page: number;
}

export default function CustomPagination({ numberOfPages, setPage, page }: Props) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button
                        onClick={() => {
                            setPage(page - 1);
                        }}
                        variant={"ghost"}
                        disabled={page - 1 < 0}
                    >
                        Previous
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        onClick={() => {
                            setPage(page + 1);
                        }}
                        variant={"ghost"}
                        disabled={page + 1 + 1 > numberOfPages}
                    >
                        Next
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
