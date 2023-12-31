import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { User } from "@/types/user";
import { User as Auth0User } from "@auth0/auth0-react";

type Props = {
  user?: User | Auth0User;
  showName: boolean;
};

export const AvatarProfile: React.FC<Props> = ({ user, showName }) => {
  return (
    <Box display="flex" gap="3">
      <Avatar src={user?.picture} name={user?.name} size="lg" />
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Text fontWeight="medium">{user?.name}</Text>
        {showName && (
          <Text mt="1" color="gray.600" fontSize="xs">
            {user?.name}
          </Text>
        )}
      </Box>
    </Box>
  );
};
