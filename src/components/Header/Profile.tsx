import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: Boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gustavo Altevir da Costa</Text>
          <Text color="gray.300" fontSize="small">
            cmtehenz@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Gustavo Costa"
        src="https://github.com/cmtehenz.png"
      />
    </Flex>
  );
}
