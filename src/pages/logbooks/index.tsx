import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";


import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useLogbooks } from "../../services/hooks/useLogbooks";


export default function LoogbookList(){
  const [page, setPage] = useState(1);
  const [full, setFull] = useState(false);

  const { data, isLoading, isFetching, error } = useLogbooks(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Diário
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ): error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ): (
            <>
            <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>de</Th>
                <Th>para</Th>
                <Th>Partida</Th>
                { full && <Th>Dec</Th> }
                { full && <Th>Pouso</Th> }
                { full && <Th>Corte</Th> }
                { full && <Th>DIU</Th> }
                { full && <Th>NOT</Th> }
                { full && <Th>IFR-R</Th> }
                { full && <Th>IFR-C</Th> }
                <Th>TOTAL</Th>
                { full && <Th>Comb</Th> }
                { full && <Th>POB</Th> }
                { full && <Th>Carga</Th> }
                <Th>Pousos</Th>
                <Th>NG</Th>
                <Th>NTL</Th>
                <Th>Usage</Th>
                <Th>VEMD</Th>
                { full && <Th>NAT</Th> }
                { full && <Th>PIC</Th> }
                { full && <Th>SIC</Th> }
                { full && <Th>Rubrica</Th> }

              </Tr>
            </Thead>

            <Tbody>
              { data.logbooks.map(log => {
                return (
                  <Tr>
                    <Td>{log.date}</Td>
                    <Td>{log.from}</Td>
                    <Td>{log.to}</Td>
                    <Td>{log.partida}</Td>
                    { full && <Td>{log.decolagem}</Td> }
                    { full && <Td>{log.pouso}</Td> }
                    { full && <Td>{log.corte}</Td> }
                    { full && <Td>{log.diurno}</Td> }
                    { full && <Td>{log.noturno}</Td> }
                    { full && <Td>{log.ifrr}</Td> }
                    { full && <Td>{log.ifrc}</Td> }
                    <Td>{log.total}</Td>
                    { full && <Td>{log.combustivel}</Td> }
                    { full && <Td>{log.pob}</Td> }
                    { full && <Td>{log.carga}</Td> }
                    <Td>{log.pousos}</Td>
                    <Td>{log.ng}</Td>
                    <Td>{log.ntl}</Td>
                    <Td>{log.usage}</Td>
                    <Td>{log.vemd}</Td>
                    { full && <Td>{log.nat}</Td> }
                    { full && <Td>{log.pic}</Td> }
                    { full && <Td>{log.sic}</Td> }
                    { full && <Td>{log.rubrica}</Td> }
                  </Tr>
                )
              })}

            </Tbody>

            </Table>
            <Pagination
              registersPerPage={8}
              totalCountOfRegisters={data.totalCount}
              curruntPage={page}
              onPageChange={setPage}
            />
            </>
          )}

        </Box>
      </Flex>
    </Box>
  );
}

