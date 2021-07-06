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


export default function LoogbookList(){
  const [full, setFull] = useState(false);
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
              Usuários
              {/* { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />} */}
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

          { false ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ): false ? (
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
              <Tr>
                <Td>26/06/2021</Td>
                <Td>SJKD</Td>
                <Td>SJKD</Td>
                <Td>12:00</Td>
                { full && <Td>12:08</Td> }
                { full && <Td>12:20</Td> }
                { full && <Td>12:28</Td> }
                { full && <Td>0,2</Td> }
                { full && <Td>-</Td> }
                { full && <Td>-</Td> }
                { full && <Td>-</Td> }
                <Td>0,2</Td>
                { full && <Td>354</Td> }
                { full && <Td>1</Td> }
                { full && <Td>-</Td> }
                <Td>1</Td>
                <Td>0,87</Td>
                <Td>0,5</Td>
                <Td>4,8</Td>
                <Td>2426</Td>
                { full && <Td>PV</Td> }
                { full && <Td>118302/SJUM</Td> }
                { full && <Td>-</Td> }
                { full && <Td>Assinatura</Td> }
              </Tr>
            </Tbody>

            </Table>
            <Pagination
              totalCountOfRegisters={200}
              curruntPage={1}
              onPageChange={() =>{}}
            />
            </>
          )}

        </Box>
      </Flex>
    </Box>
  );
}

