import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { apiAuth } from "../../services/api";

interface ProfileProps {
  showProfileData: Boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    apiAuth.get('/me').then(response => console.log(response))
  }, [])

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

      <Avatar
        size="md"
        name="Gustavo Costa"
        src="https://github.com/cmtehenz.png"
      />
    </Flex>
  );
}
