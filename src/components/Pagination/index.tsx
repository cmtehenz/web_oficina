import { Stack, Text, Button, Box } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  curruntPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number){
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  curruntPage = 1,
  onPageChange,
 }: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPages = curruntPage > 1
    ? generatePagesArray(curruntPage - 1 - siblingsCount, curruntPage - 1)
    : []

  const nextPages = curruntPage < lastPage
    ? generatePagesArray(curruntPage, Math.min(curruntPage + siblingsCount, lastPage))
    : []

  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">

        {curruntPage > (1 + siblingsCount) && (
          <>
            <PaginationItem number={1} />
            { curruntPage > (2 + siblingsCount) && (
              <Text color="gray.300" width="8" textAlign="center" >...</Text>
            )}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem number={page} key={page} />
        })}

        <PaginationItem isCurrent number={curruntPage} />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem number={page} key={page} />
        })}

        {(curruntPage + siblingsCount) < lastPage && (
          <>
            { (curruntPage + 1 + siblingsCount) < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
            <PaginationItem number={lastPage} />
          </>
        )}

      </Stack>
    </Stack>
  );
}
