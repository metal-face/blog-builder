import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Props {
    numberOfPages: number;
    setPage: Dispatch<SetStateAction<number>>;
    setEnabled: Dispatch<SetStateAction<boolean>>;
    page: number;
}

export default function CustomPagination({ numberOfPages, setPage, setEnabled, page }: Props) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button
                        onClick={() => {
                            setPage(page - 1);
                            setEnabled(true);
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
                            setEnabled(true);
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
