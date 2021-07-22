import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData: Boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gustavo Altevir da Costa</Text>
          <Text color="gray.300" fontSize="small">
            {user?.email}
          </Text>
        </Box>
      )}
      <button onClick={signOut}>
        <Avatar
          size="md"
          name="Gustavo Costa"
          src="https://github.com/cmtehenz.png"
        />
      </button>

    </Flex>
  );
}
