import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { destroyCookie } from "nookies";
import { useContext } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupApiClient } from "../services/api";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { withSSRAuth } from "../utils/withSSRAuth";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enable: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-05-03T00:00:00.000Z",
      "2021-05-04T00:00:00.000Z",
      "2021-05-05T00:00:00.000Z",
      "2021-05-06T00:00:00.000Z",
      "2021-05-07T00:00:00.000Z",
      "2021-05-08T00:00:00.000Z",
      "2021-05-09T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: "series1", data: [31, 120, 10, 28, 61, 18, 109] }];

export default function Dashboard() {
  const { user, isAuthenticated } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  })

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            {/* { userCanSeeMetrics && <div>Métricas</div> } */}
            <Text fontSize="lg" mb="4">
              Inscritos da Semana
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>

          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get('/me');
  console.log(response.data);

  return {
    props: {}
  }
})
