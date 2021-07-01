import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import Logo from "./Logo";
import NotificationsNav from "./NotificationsNav";
import { Profile } from "./Profile";
import SearchBox from "./SearchBox";
import { useSession } from "next-auth/client";
import { useRouter } from 'next/router'


export function Header() {
  const { onOpen } = useSidebarDrawer();

  const router = useRouter();

  const [session] = useSession();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  if(!session){
    //router.push('/')
  }

  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      maxWidth={1480}
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open Navegation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}
      <Logo />
      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}