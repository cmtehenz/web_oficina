import { Text } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl", "4xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      flyGO
      <Text as="span" ml="1" color="pink.500">
        .
      </Text>
    </Text>
  );
}
